import { View, ScrollView, Text } from 'react-native';
import { useAdminHomeViewModel } from '../../../models/AdminHomeViewModel';
import { defaultAdminStyles } from '../../styles/admin/Default';
import { adminHomeStyles } from '../../styles/admin/Home';
import { AppHeader, Footer, Button } from '../../ui/admin/Default';
export default function AdminHome() {
  const { state, actions } = useAdminHomeViewModel();
  return (
    <View style={defaultAdminStyles.container}>
      <AppHeader
        authStatus={state.authStatus}
        userName={state.user?.username}
        onLeftButtonPress={actions.handleLogout}
        styleSet={defaultAdminStyles}
      />
      <ScrollView
        contentContainerStyle={defaultAdminStyles.scrollContentContainer}>
        <View style={defaultAdminStyles.content}>
          <Text style={adminHomeStyles.pageTitle}>Painel Administrativo</Text>
          <Text style={adminHomeStyles.pageSubtitle}>
            Bem-vindo, {state.user?.username || 'Admin'}.
          </Text>
          <View style={adminHomeStyles.menuContainer}>
            <Button
              title="Gerenciar Pedidos"
              onPress={actions.navigateToOrders}
              variant="primary"
              style={adminHomeStyles.menuButton}
            />
            <Button
              title="Gerenciar Usuários"
              onPress={actions.navigateToUsers}
              variant="primary"
              style={adminHomeStyles.menuButton}
            />
            <Button
              title="Estatísticas"
              onPress={actions.navigateToStats}
              variant="secondary"
              style={adminHomeStyles.menuButton}
            />
          </View>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}
