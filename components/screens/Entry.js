import { View, ScrollView } from 'react-native';
import { useEntryViewModel } from '../../models/EntryViewModel';
import { Footer, Loading, Card, Button, AppHeader } from '../ui/client/Default';
import { LoginForm, PageTitle } from '../ui/client/Home';
import { homeClientStyles } from '../styles/client/Home';
import { ClientDefaultStyle } from '../styles/client/Default';
export default function EntryScreen() {
  const { state, actions } = useEntryViewModel();
  const containerStyle = ClientDefaultStyle.container;
  const contentStyle = ClientDefaultStyle.content;
  const scrollContentStyle = ClientDefaultStyle.scrollContentContainer;
  return (
    <View style={containerStyle}>
      <AppHeader
        styleSet={ClientDefaultStyle}
        authStatus="unauthenticated"
        isLoginView={state.isLoginView}
        onLeftButtonPress={actions.toggleView}
      />
      <ScrollView contentContainerStyle={scrollContentStyle}>
        {state.isLoading && <Loading message="Conectando..." />}
        {!state.isLoading && (
          <View style={contentStyle}>
            <PageTitle
              title={state.isLoginView ? 'Acessar Conta' : 'Criar Cadastro'}
            />
            <Card>
              <LoginForm
                username={state.usernameInput}
                password={state.passwordInput}
                email={state.emailInput}
                isLoginView={state.isLoginView}
                onUsernameChange={actions.setUsernameInput}
                onPasswordChange={actions.setPasswordInput}
                onEmailChange={actions.setEmailInput}
              />
            </Card>
            <View style={homeClientStyles.buttonContainer}>
              <Button
                title={state.isLoginView ? 'Entrar' : 'Registrar'}
                onPress={actions.handleAuthAction}
                variant="primary"
                disabled={state.isLoading}
              />
              <Button
                title="Entrar como Convidado"
                onPress={actions.handleGuestEntry}
                variant="secondary"
                disabled={state.isLoading}
              />
            </View>
          </View>
        )}
      </ScrollView>
      <Footer />
    </View>
  );
}
