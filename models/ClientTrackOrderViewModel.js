import DIContainer from '../core/DIContainer';
import { useReducer, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { COMMAND_NAMES, AUTH_STATUS } from '../core/constants';
const ActionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_ORDERS: 'SET_ORDERS',
  SET_TIMELINE: 'SET_TIMELINE',
  CLEAR_TIMELINE: 'CLEAR_TIMELINE',
};
const initialState = {
  isLoading: false,
  userOrders: [],
  selectedOrderTimeline: null,
};
function reducer(state, action) {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return { ...state, isLoading: action.payload };
    case ActionTypes.SET_ORDERS:
      return { ...state, userOrders: action.payload, isLoading: false };
    case ActionTypes.SET_TIMELINE:
      return {
        ...state,
        selectedOrderTimeline: action.payload,
        isLoading: false,
      };
    case ActionTypes.CLEAR_TIMELINE:
      return { ...state, selectedOrderTimeline: null };
    default:
      return state;
  }
}
export function useClientTrackOrderViewModel() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user, authStatus } = useAuth();
  const userName = user?.username;
  const maestro = DIContainer.resolve('IMaestro');
  useEffect(() => {
    const loadUserOrders = async () => {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      try {
        const orders = await maestro.execute(COMMAND_NAMES.FETCH_USER_ORDERS);
        dispatch({ type: ActionTypes.SET_ORDERS, payload: orders });
      } catch (error) {
        dispatch({ type: ActionTypes.SET_ORDERS, payload: [] });
      }
    };
    loadUserOrders();
  }, [maestro]);
  const handleHeaderButtonPress = useCallback(() => {
    if (authStatus === AUTH_STATUS.AUTHENTICATED) {
      maestro.execute(COMMAND_NAMES.LOGOUT);
    } else {
      maestro.execute(COMMAND_NAMES.NAVIGATE, { screenName: 'Entry' });
    }
  }, [authStatus, maestro]);
  const handleBackButtonPress = useCallback(() => {
    if (state.selectedOrderTimeline) {
      dispatch({ type: ActionTypes.CLEAR_TIMELINE });
    } else {
      maestro.execute(COMMAND_NAMES.NAVIGATE_BACK);
    }
  }, [state.selectedOrderTimeline, maestro]);
  const handleViewOrderDetails = useCallback(
    async (orderId) => {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      try {
        const timelineViewModel = await maestro.execute(
          COMMAND_NAMES.FETCH_ORDER_DETAILS,
          { orderId }
        );
        dispatch({
          type: ActionTypes.SET_TIMELINE,
          payload: timelineViewModel,
        });
      } catch (error) {
        dispatch({ type: ActionTypes.SET_TIMELINE, payload: null });
      }
    },
    [maestro]
  );
  return {
    state,
    auth: {
      authStatus,
      userName,
    },
    actions: {
      handleHeaderButtonPress,
      handleBackButtonPress,
      handleViewOrderDetails,
    },
  };
}
