import DIContainer from '../core/DIContainer';
import { useReducer, useEffect, useCallback, useMemo } from 'react';
import { COMMAND_NAMES } from '../core/constants';
const ActionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_STATS: 'SET_STATS',
  SET_ERROR: 'SET_ERROR',
};
const initialState = {
  isLoading: true,
  stats: null,
  error: null,
};
function reducer(state, action) {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return { ...state, isLoading: action.payload, error: null };
    case ActionTypes.SET_STATS:
      return { ...state, stats: action.payload, isLoading: false, error: null };
    case ActionTypes.SET_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
}
export function useAdminStatisticsViewModel() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const maestro = DIContainer.resolve('IMaestro');
  useEffect(() => {
    const loadStats = async () => {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      try {
        const statsData = await maestro.execute(
          COMMAND_NAMES.FETCH_ADMIN_STATISTICS
        );
        dispatch({ type: ActionTypes.SET_STATS, payload: statsData });
      } catch (error) {
        dispatch({
          type: ActionTypes.SET_ERROR,
          payload: error.message || 'Não foi possível carregar estatísticas.',
        });
      }
    };
    loadStats();
  }, [maestro]);
  const pieChartData = useMemo(() => {
    if (!state.stats || !state.stats.statsDistribution) {
      return [];
    }
    const { open, analysis, complete } = state.stats.statsDistribution;
    return [
      { label: 'Pendente', value: open, color: '#A91101' },
      { label: 'Em Análise', value: analysis, color: '#DAA520' },
      { label: 'Completo', value: complete, color: '#0A3D62' },
    ];
  }, [state.stats]);
  const pieChartSlices = useMemo(() => {
    if (!state.stats || !state.stats.statsDistribution) {
      return [];
    }
    const { open, analysis, complete } = state.stats.statsDistribution;
    const total = open + analysis + complete;
    if (total === 0) {
      return [{ percentage: 1, color: '#E0E0E0' }];
    }
    return [
      { percentage: open / total, color: '#A91101' },
      { percentage: analysis / total, color: '#DAA520' },
      { percentage: complete / total, color: '#0A3D62' },
    ];
  }, [state.stats]);
  const handleBack = useCallback(() => {
    maestro.execute(COMMAND_NAMES.NAVIGATE_BACK);
  }, [maestro]);
  return {
    state: {
      isLoading: state.isLoading,
      error: state.error,
      stats: state.stats,
      pieChartData,
      pieChartSlices,
    },
    actions: {
      handleBack,
    },
  };
}
