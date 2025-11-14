class ShowAlertCommand {
  constructor(payload, interactionService) {
    this.payload = payload;
    this.interactionService = interactionService;
  }

  async execute() {
    const title = this.payload.title || 'Atenção';
    const message = this.payload.message || 'Ocorreu um erro.';
    try {
      await this.interactionService.showAlert(title, message);
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  }
}

export default ShowAlertCommand;
