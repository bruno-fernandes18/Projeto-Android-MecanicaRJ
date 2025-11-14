import DIContainer from '../core/DIContainer';
import { useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { COMMAND_NAMES, AUTH_STATUS } from '../core/constants';
export function useClientHomeViewModel() {
  const { authStatus } = useAuth();
  const maestro = DIContainer.resolve('IMaestro');
  const handleHeaderButtonPress = useCallback(() => {
    if (authStatus === AUTH_STATUS.AUTHENTICATED) {
      maestro.execute(COMMAND_NAMES.LOGOUT);
    } else {
      maestro.execute(COMMAND_NAMES.NAVIGATE, { screenName: 'Entry' });
    }
  }, [authStatus, maestro]);
  const navigateToOrder = useCallback(() => {
    maestro.execute(COMMAND_NAMES.NAVIGATE, { screenName: 'Order' });
  }, [maestro]);
  const navigateToTrackOrder = useCallback(async () => {
    if (authStatus === AUTH_STATUS.AUTHENTICATED) {
      maestro.execute(COMMAND_NAMES.NAVIGATE, {
        screenName: 'ClientTrackOrder',
      });
    } else {
      const payload = { screenName: 'ClientTrackOrder' };
      await maestro.execute(COMMAND_NAMES.SHOW_AUTH_DIALOG, {
        context: payload,
      });
    }
  }, [authStatus, maestro]);
  const navigateToAbout = useCallback(() => {
    maestro.execute(COMMAND_NAMES.NAVIGATE, { screenName: 'About' });
  }, [maestro]);
  return {
    state: {
      authStatus,
    },
    actions: {
      handleHeaderButtonPress,
      navigateToOrder,
      navigateToTrackOrder,
      navigateToAbout,
    },
  };
}
