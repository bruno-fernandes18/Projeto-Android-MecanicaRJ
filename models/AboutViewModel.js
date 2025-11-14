import { useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import DIContainer from '../core/DIContainer';
import { useNavigation } from '@react-navigation/native';
export function useAboutViewModel() {
  const { authStatus } = useAuth();
  const navigation = useNavigation();
  const maestro = DIContainer.resolve('IMaestro');
  const handleHeaderButtonPress = useCallback(() => {
    if (authStatus === 'authenticated') {
      maestro.execute('logout');
    } else {
      maestro.execute('navigate', { screenName: 'Entry' });
    }
  }, [authStatus, maestro]);
  const handleBackButtonPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  return {
    authStatus,
    actions: {
      handleHeaderButtonPress,
      handleBackButtonPress,
    },
  };
}
