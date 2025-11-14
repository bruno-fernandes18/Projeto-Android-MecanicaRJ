import { createContext, useContext, useState, useEffect } from 'react';
import DIContainer from '../core/DIContainer';
import { AUTH_STATUS } from '../core/constants';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const authService = DIContainer.resolve('IAuthService');
  const [authData, setAuthData] = useState({
    user: authService.currentUser,
    status: authService.authStatus,
  });
  useEffect(() => {
    let isMounted = true;
    const AuthService = DIContainer.resolve('IAuthService');
    if (!AuthService) {
      console.error('AuthContext: IAuthService not found in DIContainer.');
      return;
    }
    setAuthData({
      user: AuthService.currentUser,
      status: AuthService.authStatus,
    });
    const unsubscribe = authService.subscribe((data) => {
      if (isMounted) {
        setAuthData({ user: data.user, status: data.status });
      }
    });
    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [authService]);
  const value = { user: authData.user, authStatus: authData.status };
  return (
    <AuthContext.Provider value={value}>
      {authData.status !== AUTH_STATUS.LOADING && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
