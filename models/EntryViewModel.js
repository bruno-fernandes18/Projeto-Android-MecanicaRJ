import DIContainer from '../core/DIContainer';
import { useReducer, useCallback } from 'react';
import { COMMAND_NAMES } from '../core/constants';
const ActionTypes = {
  SET_FIELD: 'SET_FIELD',
  SET_LOADING: 'SET_LOADING',
  TOGGLE_VIEW: 'TOGGLE_VIEW',
};
const initialState = {
  usernameInput: '',
  emailInput: '',
  passwordInput: '',
  isLoading: false,
  isLoginView: true,
};
function entryReducer(state, action) {
  switch (action.type) {
    case ActionTypes.SET_FIELD:
      return { ...state, [action.payload.field]: action.payload.value };
    case ActionTypes.SET_LOADING:
      return { ...state, isLoading: action.payload };
    case ActionTypes.TOGGLE_VIEW:
      return { ...initialState, isLoginView: !state.isLoginView };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}
export function useEntryViewModel() {
  const [state, dispatch] = useReducer(entryReducer, initialState);
  const maestro = DIContainer.resolve('IMaestro');
  const interactionService = DIContainer.resolve('IInteractionService');
  const setUsernameInput = (value) =>
    dispatch({
      type: ActionTypes.SET_FIELD,
      payload: { field: 'usernameInput', value },
    });
  const setEmailInput = (value) =>
    dispatch({
      type: ActionTypes.SET_FIELD,
      payload: { field: 'emailInput', value },
    });
  const setPasswordInput = (value) =>
    dispatch({
      type: ActionTypes.SET_FIELD,
      payload: { field: 'passwordInput', value },
    });
  const toggleView = useCallback(() => {
    dispatch({ type: ActionTypes.TOGGLE_VIEW });
  }, []);
  const handleAuthAction = useCallback(async () => {
    const { usernameInput, passwordInput, emailInput, isLoginView } = state;
    if (isLoginView && (!emailInput.trim() || !passwordInput.trim())) {
      interactionService.showAlert('Erro', 'Por favor, digite email e senha.');
      return;
    }
    if (
      !isLoginView &&
      (!usernameInput.trim() || !emailInput.trim() || !passwordInput.trim())
    ) {
      interactionService.showAlert(
        'Erro',
        'Por favor, preencha todos os campos para o registro.'
      );
      return;
    }
    if (!isLoginView) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.trim())) {
        interactionService.showAlert(
          'Erro',
          'Por favor, digite um email válido.'
        );
        return;
      }
    }
    dispatch({ type: ActionTypes.SET_LOADING, payload: true });
    try {
      const commandName = isLoginView
        ? COMMAND_NAMES.LOGIN
        : COMMAND_NAMES.REGISTER;
      const payload = isLoginView
        ? { identifier: emailInput.trim(), password: passwordInput }
        : {
            username: usernameInput.trim(),
            email: emailInput.trim(),
            password: passwordInput,
          };
      const result = await maestro.execute(commandName, payload);
      if (result && result.success) {
        await maestro.execute(COMMAND_NAMES.HANDLE_AUTH);
      } else {
        interactionService.showAlert(
          'Erro de Autenticação',
          result.message || 'Credenciais Inválidas.'
        );
      }
    } catch (error) {
      interactionService.showAlert(
        'Erro',
        error.message || 'Falha ao conectar com o servidor.'
      );
    }
    dispatch({ type: ActionTypes.SET_LOADING, payload: false });
  }, [state, maestro, interactionService]);
  const handleGuestEntry = useCallback(async () => {
    dispatch({ type: ActionTypes.SET_LOADING, payload: true });
    try {
      await maestro.execute(COMMAND_NAMES.CONTINUE_AS_GUEST, {});
    } catch (error) {
      interactionService.showAlert(
        'Erro',
        error.message || 'Não foi possível entrar como Convidado.'
      );
    }
    dispatch({ type: ActionTypes.SET_LOADING, payload: false });
  }, [maestro, interactionService]);
  return {
    state,
    actions: {
      setUsernameInput,
      setEmailInput,
      setPasswordInput,
      handleAuthAction,
      handleGuestEntry,
      toggleView,
    },
  };
}
