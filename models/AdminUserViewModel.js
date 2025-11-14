import DIContainer from '../core/DIContainer';
import { useReducer, useEffect, useCallback, useMemo } from 'react';
import { COMMAND_NAMES, FORM_MODES } from '../core/constants';
const ActionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_USERS: 'SET_USERS',
  SET_ERROR: 'SET_ERROR',
  SET_SORT_CONFIG: 'SET_SORT_CONFIG',
};
const initialState = {
  isLoading: true,
  users: [],
  error: null,
  sortConfig: { key: 'createdAt', direction: 'asc' },
};
function reducer(state, action) {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return { ...state, isLoading: action.payload, error: null };
    case ActionTypes.SET_USERS:
      return { ...state, users: action.payload, isLoading: false, error: null };
    case ActionTypes.SET_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case ActionTypes.SET_SORT_CONFIG:
      return {
        ...state,
        sortConfig: {
          key: action.payload.key,
          direction:
            state.sortConfig.key === action.payload.key &&
            state.sortConfig.direction === 'asc'
              ? 'desc'
              : 'asc',
        },
      };
    default:
      return state;
  }
}
export function useAdminUserViewModel() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const maestro = DIContainer.resolve('IMaestro');
  useEffect(() => {
    const loadUsers = async () => {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      try {
        const usersData = await maestro.execute(
          COMMAND_NAMES.FETCH_ADMIN_USERS
        );
        dispatch({ type: ActionTypes.SET_USERS, payload: usersData });
      } catch (error) {
        dispatch({
          type: ActionTypes.SET_ERROR,
          payload: error.message || 'Não foi possível carregar usuários.',
        });
      }
    };
    loadUsers();
  }, [maestro]);
  const sortedList = useMemo(() => {
    if (!state.users) return [];
    return [...state.users].sort((a, b) => {
      let aValue = a[state.sortConfig.key];
      let bValue = b[state.sortConfig.key];
      if (
        typeof aValue === 'string' &&
        aValue.includes('T') &&
        aValue.includes('Z')
      ) {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      if (aValue < bValue) return state.sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return state.sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [state.users, state.sortConfig]);
  const handleSort = useCallback((key) => {
    dispatch({ type: ActionTypes.SET_SORT_CONFIG, payload: { key } });
  }, []);
  const handleBack = useCallback(() => {
    maestro.execute(COMMAND_NAMES.NAVIGATE_BACK);
  }, [maestro]);
  const handleEditUser = useCallback(
    (userId) => {
      maestro.execute(COMMAND_NAMES.NAVIGATE, {
        screenName: 'AdminFormScreen',
        params: { mode: FORM_MODES.USER, id: userId },
      });
    },
    [maestro]
  );
  return {
    state: {
      isLoading: state.isLoading,
      error: state.error,
      users: state.users,
      sortedList,
      sortConfig: state.sortConfig,
    },
    actions: {
      handleBack,
      handleEditUser,
      handleSort,
    },
  };
}
