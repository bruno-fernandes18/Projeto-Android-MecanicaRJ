import DIContainer from '../core/DIContainer';
import { useReducer, useCallback, useEffect, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  getDefaultOrderDraft,
  ORDER_DESCRIPTION_MAX_LENGTH,
} from './OrderModel';
import { useAuth } from '../context/AuthContext';
import { COMMAND_NAMES, AUTH_STATUS } from '../core/constants';
const ActionTypes = {
  SET_DRAFT: 'SET_DRAFT',
  GO_TO_SECTION: 'GO_TO_SECTION',
  SET_CHAR_COUNT: 'SET_CHAR_COUNT',
  RESET: 'RESET',
  UPDATE_FLOW: 'UPDATE_FLOW',
};
const BASE_SECTIONS = [
  'Intro',
  'WashCheck',
  'ProblemsCore',
  'ProblemsChassis',
  'Description',
  'Cart',
];
const WASH_ONLY_SECTION = 'OnlyWashCheck';
const initialState = {
  draft: getDefaultOrderDraft(),
  currentSectionIndex: 0,
  totalSections: BASE_SECTIONS.length,
  sectionFlow: BASE_SECTIONS,
  charCount: `0/${ORDER_DESCRIPTION_MAX_LENGTH}`,
  isCharLimitExceeded: false,
};
function reducer(state, action) {
  switch (action.type) {
    case ActionTypes.SET_DRAFT:
      return { ...state, draft: action.payload };
    case ActionTypes.GO_TO_SECTION:
      return { ...state, currentSectionIndex: action.payload };
    case ActionTypes.SET_CHAR_COUNT:
      return {
        ...state,
        charCount: action.payload.count,
        isCharLimitExceeded: action.payload.isError,
      };
    case ActionTypes.RESET:
      return initialState;
    case ActionTypes.UPDATE_FLOW:
      return {
        ...state,
        sectionFlow: action.payload.flow,
        totalSections: action.payload.flow.length,
      };
    default:
      return state;
  }
}
const calculateBudget = (draft) => {
  let total = 0;
  if (draft.is_wash) total += 50;
  if (draft.is_only_wash) return 'R$ 50.00 (Estimado)';
  if (draft.problems_engine) total += 300;
  if (draft.problems_electric) total += 150;
  if (draft.problems_fluids) total += 80;
  if (draft.problems_brake) total += 120;
  if (draft.problems_tire) total += 100;
  if (total === 0) return 'Aguardando Análise';
  if (total === 50 && !draft.is_wash) return 'Aguardando Análise';
  return `R$ ${total.toFixed(2)} (Estimado)`;
};
export function useOrderViewModel() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigation = useNavigation();
  const orderDraftService = DIContainer.resolve('IOrderDraftService');
  const maestro = DIContainer.resolve('IMaestro');
  const { authStatus } = useAuth();
  useEffect(() => {
    if (authStatus === AUTH_STATUS.GUEST) {
      setTimeout(() => {
        maestro.execute(COMMAND_NAMES.SHOW_ALERT, {
          title: 'Modo Convidado',
          message:
            'Você está criando um pedido como convidado. Para finalizá-lo, você precisará se autenticar na última etapa.',
        });
      }, 500);
    }
  }, [authStatus, maestro]);
  useEffect(() => {
    orderDraftService.updateDraft(state.draft);
  }, [state.draft, orderDraftService]);
  const updateSectionFlow = (draft) => {
    let flow = [...BASE_SECTIONS];
    if (draft.is_wash === true) {
      if (!flow.includes(WASH_ONLY_SECTION)) {
        flow.splice(2, 0, WASH_ONLY_SECTION);
      }
    } else {
      flow = flow.filter((s) => s !== WASH_ONLY_SECTION);
    }
    if (draft.is_only_wash === true) {
      flow = flow.filter(
        (s) => s !== 'ProblemsCore' && s !== 'ProblemsChassis'
      );
    }
    return flow;
  };
  const updateDraftField = useCallback(
    (key, value) => {
      const newDraft = { ...state.draft, [key]: value };
      if (key === 'is_wash' && value === false) {
        newDraft.is_only_wash = false;
      }
      dispatch({ type: ActionTypes.SET_DRAFT, payload: newDraft });
      const newFlow = updateSectionFlow(newDraft);
      if (newFlow.join() !== state.sectionFlow.join()) {
        dispatch({ type: ActionTypes.UPDATE_FLOW, payload: { flow: newFlow } });
      }
    },
    [state.draft, state.sectionFlow]
  );
  const goToNextSection = useCallback(() => {
    const newIndex = state.currentSectionIndex + 1;
    if (newIndex < state.totalSections) {
      dispatch({ type: ActionTypes.GO_TO_SECTION, payload: newIndex });
    }
  }, [state.currentSectionIndex, state.totalSections]);
  const goToPrevSection = useCallback(() => {
    const newIndex = state.currentSectionIndex - 1;
    if (newIndex >= 0) {
      dispatch({ type: ActionTypes.GO_TO_SECTION, payload: newIndex });
    }
  }, [state.currentSectionIndex]);
  const handleDescriptionChange = useCallback(
    (text) => {
      const count = text.length;
      const isError = count > ORDER_DESCRIPTION_MAX_LENGTH;
      updateDraftField('description', text);
      dispatch({
        type: ActionTypes.SET_CHAR_COUNT,
        payload: {
          count: `${count}/${ORDER_DESCRIPTION_MAX_LENGTH}`,
          isError: isError,
        },
      });
    },
    [updateDraftField]
  );
  const handleSubmitOrder = useCallback(async () => {
    if (state.isCharLimitExceeded) {
      maestro.execute(COMMAND_NAMES.SHOW_ALERT, {
        title: 'Erro',
        message: 'Você excedeu o limite de caracteres da descrição.',
      });
      return;
    }
    await maestro.execute(COMMAND_NAMES.REGISTER_ORDER);
    dispatch({ type: ActionTypes.RESET });
  }, [state.isCharLimitExceeded, maestro]);
  const handleHeaderButtonPress = useCallback(() => {
    if (authStatus === AUTH_STATUS.AUTHENTICATED) {
      maestro.execute(COMMAND_NAMES.LOGOUT);
    } else {
      maestro.execute(COMMAND_NAMES.NAVIGATE, { screenName: 'Entry' });
    }
  }, [authStatus, maestro]);
  const handleCancel = useCallback(() => {
    orderDraftService.clearDraft();
    dispatch({ type: ActionTypes.RESET });
    navigation.goBack();
  }, [navigation, orderDraftService]);
  const estimatedBudget = useMemo(
    () => calculateBudget(state.draft),
    [state.draft]
  );
  return {
    state: {
      ...state,
      authStatus: authStatus,
      currentSectionIndex: Math.min(
        state.currentSectionIndex,
        state.totalSections - 1
      ),
      estimatedBudget: estimatedBudget,
    },
    actions: {
      updateDraftField,
      goToNextSection,
      goToPrevSection,
      handleDescriptionChange,
      handleSubmitOrder,
      handleCancel,
      handleHeaderButtonPress,
    },
  };
}
