import { COMMAND_NAMES } from '../../core/constants.js';

class RegisterOrderCommand {
  constructor(
    authService,
    orderDraftService,
    apiService,
    maestro,
    persistenceService,
    interactionService
  ) {
    this.authService = authService;
    this.orderDraftService = orderDraftService;
    this.apiService = apiService;
    this.maestro = maestro;
    this.persistenceService = persistenceService;
    this.interactionService = interactionService;
  }

  async execute() {
    if (!this.authService.isUserAuthenticated()) {
      console.log(
        '[RegisterOrderCommand] Usuário não autenticado. Mostrando diálogo de auth.'
      );
      const pendingAction = {
        commandName: COMMAND_NAMES.REGISTER_ORDER,
        context: {},
      };
      this.persistenceService.savePendingAction(pendingAction);
      await this.maestro.execute(COMMAND_NAMES.SHOW_AUTH_DIALOG, {
        context: pendingAction,
      });
      return;
    }

    const draftData = this.orderDraftService.getDraft();
    console.log(
      '[RegisterOrderCommand] Usuário autenticado. Chamando ApiService "registerOrder" com:',
      draftData
    );

    try {
      const data = await this.apiService.registerOrder(draftData);

      if (data) {
        console.log(
          '[RegisterOrderCommand] Sucesso! Pedido e Status criados. ID:',
          data.id
        );
        this.orderDraftService.clearDraft();
        await this.maestro.execute(COMMAND_NAMES.NAVIGATE, {
          screenName: 'ClientTrackOrder',
        });
      }
    } catch (error) {
      console.error(
        '[RegisterOrderCommand] Falha ao chamar ApiService:',
        error.message
      );
      await this.interactionService.showAlert(
        'Erro na Submissão',
        error.message ||
          'Não foi possível registrar seu pedido. Tente novamente.'
      );
    }
  }
}

export default RegisterOrderCommand;
