import DIContainer from '../core/DIContainer';
import { useReducer, useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { COMMAND_NAMES } from '../core/constants';
const ActionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_READY: 'SET_READY',
  SET_ERROR: 'SET_ERROR',
  UPDATE_FIELD: 'UPDATE_FIELD',
  SET_SAVING: 'SET_SAVING',
};
const initialState = {
  isLoading: true,
  isSaving: false,
  error: null,
  formSchema: [],
  formData: {},
  formConfig: null,
  originalUpdatedAt: null,
};
function reducer(state, action) {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return { ...state, isLoading: true, error: null };
    case ActionTypes.SET_ERROR:
      return {
        ...state,
        isLoading: false,
        isSaving: false,
        error: action.payload,
      };
    case ActionTypes.UPDATE_FIELD:
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.payload.key]: action.payload.value,
        },
      };
    case ActionTypes.SET_SAVING:
      return { ...state, isSaving: action.payload, error: null };
    case ActionTypes.SET_READY:
      if (action.payload.schema && Array.isArray(action.payload.schema)) {
        const selectFields = action.payload.schema.filter(
          (f) => f.type === 'select'
        );
        selectFields.forEach((field) => {
          if (!field.options || !Array.isArray(field.options)) {
          } else if (
            !field.options.some(
              (opt) => opt.value === action.payload.data[field.key]
            )
          ) {
          }
        });
      }
      return {
        ...state,
        isLoading: false,
        error: null,
        formSchema: action.payload.schema,
        formData: action.payload.data,
        formConfig: action.payload.config,
        originalUpdatedAt: action.payload.originalUpdatedAt,
      };
    default:
      return state;
  }
}
const normalizeFormDataForPayload = (formData) => {
  const normalized = { ...formData };
  if (normalized.updatedAt !== undefined) {
    normalized.updated_at = normalized.updatedAt;
    delete normalized.updatedAt;
  }
  return normalized;
};
export function useAdminFormViewModel(mode, id) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigation = useNavigation();
  const formConfigService = DIContainer.resolve('IAdminFormConfigService');
  const maestro = DIContainer.resolve('IMaestro');
  useEffect(() => {
    const loadForm = async () => {
      dispatch({ type: ActionTypes.SET_LOADING });
      try {
        const config = formConfigService.getConfig(mode);
        const data = await maestro.execute(config.fetchCommand, { id });
        if (!data) {
          throw new Error('Item not found.');
        }
        const schema = config.buildSchema(data);
        if (!schema || schema.length === 0) {
          throw new Error('Falha ao construir o schema do formulário.');
        }
        const roleFieldInSchema = schema.find((f) => f.key === 'role');
        if (roleFieldInSchema) {
        } else {
        }
        const schemaDefaults = schema.reduce((acc, field) => {
          acc[field.key] = field.defaultValue;
          return acc;
        }, {});
        const finalFormData = { ...schemaDefaults, ...data };
        const payload = {
          schema,
          data: finalFormData,
          config,
          originalUpdatedAt: data.updated_at || null,
        };
        dispatch({
          type: ActionTypes.SET_READY,
          payload: payload,
        });
      } catch (error) {
        dispatch({
          type: ActionTypes.SET_ERROR,
          payload: `Falha ao carregar os dados: ${error.message}`,
        });
      }
    };
    if (mode && id) {
      loadForm();
    } else {
    }
  }, [mode, id, formConfigService, maestro]);
  const handleFieldChange = useCallback((key, value) => {
    dispatch({ type: ActionTypes.UPDATE_FIELD, payload: { key, value } });
  }, []);
  const handleSave = useCallback(async () => {
    dispatch({ type: ActionTypes.SET_SAVING, payload: true });
    try {
      const { saveCommand } = state.formConfig;
      if (!saveCommand) {
        throw new Error('Configuração de salvamento inválida.');
      }
      const normalizedFormData = normalizeFormDataForPayload(state.formData);
      const payload = {
        id,
        data: normalizedFormData,
        updated_at: state.originalUpdatedAt,
      };
      const result = await maestro.execute(saveCommand, payload);
      if (result && result.success) {
        await maestro.execute(COMMAND_NAMES.SHOW_ALERT, {
          title: 'Sucesso',
          message: `${state.formConfig.title} atualizado.`,
        });
        navigation.goBack();
      } else {
        throw new Error(result?.message || 'Failed to save.');
      }
    } catch (error) {
      let errorMessage = `Falha ao salvar: ${error.message}`;
      if (error.message.includes('409 Conflict')) {
        errorMessage =
          'Erro: Estes dados foram modificados por outro usuário. Por favor, recarregue.';
      } else if (error.message.includes('Permission denied')) {
        errorMessage = 'Erro: Permissão negada para esta ação.';
      }
      dispatch({ type: ActionTypes.SET_ERROR, payload: errorMessage });
    }
  }, [
    state.formConfig,
    state.formData,
    state.originalUpdatedAt,
    id,
    navigation,
    maestro,
    mode,
  ]);
  const handleCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  return { state, actions: { handleFieldChange, handleSave, handleCancel } };
}
