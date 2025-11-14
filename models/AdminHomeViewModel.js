import DIContainer from '../core/DIContainer';
import { useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { COMMAND_NAMES } from '../core/constants';
export function useAdminHomeViewModel() {
  const { user, authStatus } = useAuth();
  const maestro = DIContainer.resolve('IMaestro');
  const handleLogout = useCallback(() => {
    maestro.execute(COMMAND_NAMES.LOGOUT);
  }, [maestro]);
  const navigateToOrders = useCallback(() => {
    maestro.execute(COMMAND_NAMES.NAVIGATE, { screenName: 'AdminViewOrders' });
  }, [maestro]);
  const navigateToUsers = useCallback(() => {
    maestro.execute(COMMAND_NAMES.NAVIGATE, { screenName: 'AdminViewUsers' });
  }, [maestro]);
  const navigateToStats = useCallback(() => {
    maestro.execute(COMMAND_NAMES.NAVIGATE, {
      screenName: 'AdminViewStatistics',
    });
  }, [maestro]);
  return {
    state: {
      user,
      authStatus,
    },
    actions: {
      handleLogout,
      navigateToOrders,
      navigateToUsers,
      navigateToStats,
    },
  };
}
