import DIContainer from '../core/DIContainer';
import { useReducer, useEffect, useMemo, useCallback } from 'react';
import { COMMAND_NAMES } from '../core/constants';
const ActionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_ORDERS: 'SET_ORDERS',
  SET_ERROR: 'SET_ERROR',
  SET_SORT_CONFIG: 'SET_SORT_CONFIG',
};
const initialState = {
  isLoading: true,
  orders: [],
  error: null,
  sortConfig: { key: 'createdAt', direction: 'desc' },
};
function reducer(state, action) {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return { ...state, isLoading: action.payload, error: null };
    case ActionTypes.SET_ORDERS:
      return {
        ...state,
        orders: action.payload,
        isLoading: false,
        error: null,
      };
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
export function useAdminOrderViewModel() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const maestro = DIContainer.resolve('IMaestro');
  useEffect(() => {
    const loadOrders = async () => {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      try {
        const ordersData = await maestro.execute(
          COMMAND_NAMES.FETCH_ADMIN_ORDERS
        );
        dispatch({ type: ActionTypes.SET_ORDERS, payload: ordersData });
      } catch (error) {
        dispatch({
          type: ActionTypes.SET_ERROR,
          payload: error.message || 'Não foi possível carregar pedidos.',
        });
      }
    };
    loadOrders();
  }, [maestro]);
  const priorityOrder = useMemo(() => {
    if (!state.orders || state.orders.length === 0) return null;
    return [...state.orders]
      .filter((o) => !o.is_completed)
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))[0];
  }, [state.orders]);
  const sortedList = useMemo(() => {
    if (!state.orders) return [];
    return [...state.orders].sort((a, b) => {
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
  }, [state.orders, state.sortConfig]);
  const handleSort = useCallback((key) => {
    dispatch({ type: ActionTypes.SET_SORT_CONFIG, payload: { key } });
  }, []);
  const handleBack = useCallback(() => {
    maestro.execute(COMMAND_NAMES.NAVIGATE_BACK);
  }, [maestro]);
  const handleEditOrder = useCallback(
    (orderId) => {
      maestro.execute(COMMAND_NAMES.NAVIGATE, {
        screenName: 'AdminFormScreen',
        params: { mode: 'order', id: orderId },
      });
    },
    [maestro]
  );
  return {
    state: {
      isLoading: state.isLoading,
      error: state.error,
      orders: state.orders,
      priorityOrder,
      sortedList,
      sortConfig: state.sortConfig,
    },
    actions: {
      handleBack,
      handleEditOrder,
      handleSort,
    },
  };
}
