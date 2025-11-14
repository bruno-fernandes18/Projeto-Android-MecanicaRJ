import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { navigationRef } from './services/NavigationService';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AUTH_STATUS } from './core/constants';
import { Loading } from './components/ui/client/Default';
import EntryScreen from './components/screens/Entry';
import AboutScreen from './components/screens/client/About';
import OrderScreen from './components/screens/client/Order';
import ClientHome from './components/screens/client/Home';
import ClientTrackOrder from './components/screens/client/TrackOrder';
import AdminHome from './components/screens/admin/Home';
import AdminOrderManagementScreen from './components/screens/admin/OrderManagement';
import AdminUsersManagementScreen from './components/screens/admin/UserManagement';
import AdminStatisticsScreen from './components/screens/admin/Statistics';
import AdminFormScreen from './components/screens/admin/Form';
const Stack = createNativeStackNavigator();
function AppNavigator() {
  const { authStatus, user } = useAuth();
  if (authStatus === AUTH_STATUS.LOADING) {return <Loading message='Initializing session...' />;}
  const userRole = user?.role;
  const isAdminOrModerator = userRole === 'admin' || userRole === 'moderator';
  let initialRoute = 'Entry';
  if (authStatus === AUTH_STATUS.AUTHENTICATED) {initialRoute = isAdminOrModerator ? 'AdminHome' : 'ClientHome';}
  return (
    <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
      {authStatus === AUTH_STATUS.AUTHENTICATED ? (
        isAdminOrModerator ? (
          <>
            <Stack.Screen name='AdminHome' component={AdminHome} />
            <Stack.Screen name='AdminViewOrders' component={AdminOrderManagementScreen} />
            <Stack.Screen name='AdminViewUsers' component={AdminUsersManagementScreen} />
            <Stack.Screen name='AdminViewStatistics' component={AdminStatisticsScreen} />
            <Stack.Screen name='AdminFormScreen' component={AdminFormScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name='ClientHome' component={ClientHome} />
            <Stack.Screen name='ClientTrackOrder' component={ClientTrackOrder} />
            <Stack.Screen name='Order' component={OrderScreen} />
            <Stack.Screen name='About' component={AboutScreen} />
          </>
        )
      ) : (
        <>
          <Stack.Screen name='Entry' component={EntryScreen} />
          <Stack.Screen name='ClientHome' component={ClientHome} />
          <Stack.Screen name='Order' component={OrderScreen} />
          <Stack.Screen name='About' component={AboutScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
function App() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <NavigationContainer ref={navigationRef}>
          <AppNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </AuthProvider>
  );
}
export default App;