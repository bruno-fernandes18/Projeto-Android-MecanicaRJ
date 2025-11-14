class ContinueAsGuestCommand {
  constructor(
    payload,
    persistenceService,
    interactionService,
    maestro,
    orderDraftService
  ) {
    this.payload = payload || {};
    this.persistenceService = persistenceService;
    this.interactionService = interactionService;
    this.maestro = maestro;
    this.orderDraftService = orderDraftService;
  }

  async execute() {
    const hasPending = this.persistenceService.hasPendingAction();
    if (!hasPending) {
      await this.maestro.execute('navigate', { screenName: 'ClientHome' });
      return;
    }
    const guestResult = await this.interactionService.showGuestConfirmation();
    if (guestResult.action === 'continue_guest') {
      this.persistenceService.loadPendingAction();
      this.orderDraftService.clearDraft();
      await this.maestro.execute('navigate', { screenName: 'ClientHome' });
    } else if (guestResult.action === 'cancel_guest') {
      /* Stays */
    }
  }
}

export default ContinueAsGuestCommand;
