import { View, ScrollView } from 'react-native';
import { useClientHomeViewModel } from '../../../models/ClientHomeViewModel';
import { ClientDefaultStyle } from '../../styles/client/Default';
import { homeClientStyles } from '../../styles/client/Home';
import { AppHeader, Footer } from '../../ui/client/Default';
import { PageTitle, MenuButton } from '../../ui/client/Home';
export default function ClientHome() {
  const { state, actions } = useClientHomeViewModel();
  return (
    <View style={ClientDefaultStyle.container}>
      <AppHeader
        styleSet={ClientDefaultStyle}
        authStatus={state.authStatus}
        onLeftButtonPress={actions.handleHeaderButtonPress}
      />
      <ScrollView
        contentContainerStyle={ClientDefaultStyle.scrollContentContainer}>
        <View style={ClientDefaultStyle.content}>
          <PageTitle title="Menu Principal" />
          <View style={homeClientStyles.buttonContainer}>
            <MenuButton
              title="Nova Consulta"
              variant="primary"
              onPress={actions.navigateToOrder}
            />
            <MenuButton
              title="Acompanhar Pedidos"
              variant="secondary"
              onPress={actions.navigateToTrackOrder}
            />
            <MenuButton
              title="Sobre Nós"
              variant="secondary"
              onPress={actions.navigateToAbout}
            />
          </View>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}
