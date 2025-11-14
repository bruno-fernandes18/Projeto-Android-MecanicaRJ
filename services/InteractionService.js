import { Alert } from 'react-native';

class InteractionService {
  async showAuthRequired(actionId, context = {}) {
    return new Promise((resolve) => {
      Alert.alert(
        'Falta de Autenticação',
        'Você precisa estar credenciado para realizar essa tarefa.',
        [
          {
            text: 'Entrar',
            onPress: () => resolve({ action: 'login', actionId, context }),
          },
          {
            text: 'Registrar',
            onPress: () => resolve({ action: 'register', actionId, context }),
          },
          {
            text: 'Cancelar',
            style: 'cancel',
            onPress: () => resolve({ action: 'cancel', actionId, context }),
          },
        ],
        {
          cancelable: true,
          onDismiss: () => resolve({ action: 'cancel', actionId, context }),
        }
      );
    });
  }

  async showAdminRequired() {
    return new Promise((resolve) => {
      Alert.alert(
        'Falta de Autorização',
        'Você não tem Autorização para realizar essa tarefa.',
        [
          {
            text: 'Voltar',
            style: 'cancel',
            onPress: () => resolve({ action: 'back' }),
          },
        ],
        { cancelable: true, onDismiss: () => resolve({ action: 'back' }) }
      );
    });
  }

  async showAlert(title = 'Atenção', message = 'Ocorreu um erro.') {
    return new Promise((resolve) => {
      Alert.alert(
        title,
        message,
        [{ text: 'OK', onPress: () => resolve({ action: 'ok' }) }],
        { cancelable: true, onDismiss: () => resolve({ action: 'ok' }) }
      );
    });
  }

  async showGuestConfirmation() {
    return new Promise((resolve) => {
      Alert.alert(
        'Continuar como Convidado?',
        'Você possui uma ação pendente. Se você continuar como convidado, esta ação será perdida.',
        [
          {
            text: 'Perder Ação',
            style: 'destructive',
            onPress: () => resolve({ action: 'continue_guest' }),
          },
          {
            text: 'Cancelar',
            style: 'cancel',
            onPress: () => resolve({ action: 'cancel_guest' }),
          },
        ],
        {
          cancelable: true,
          onDismiss: () => resolve({ action: 'cancel_guest' }),
        }
      );
    });
  }
}

export default InteractionService;
