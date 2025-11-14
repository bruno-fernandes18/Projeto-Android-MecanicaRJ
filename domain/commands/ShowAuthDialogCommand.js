class ShowAuthDialogCommand {
  constructor(payload, interactionService, maestro, persistenceService) {
    this.payload = payload; // { actionId, context }
    this.interactionService = interactionService;
    this.maestro = maestro;
    this.persistenceService = persistenceService;
  }

  async execute() {
    const result = await this.interactionService.showAuthRequired(
      this.payload.actionId,
      this.payload.context
    );
    if (result.action === 'login' || result.action === 'register') {
      this.persistenceService.savePendingAction(this.payload.context);
    }

    switch (result.action) {
      case 'login':
        await this.maestro.execute('navigate', { screenName: 'Entry' });
        break;
      case 'register':
        await this.maestro.execute('navigate', { screenName: 'Entry' });
        break;
      case 'cancel':
        break;
      default:
        break;
    }
    return result;
  }
}

export default ShowAuthDialogCommand;
