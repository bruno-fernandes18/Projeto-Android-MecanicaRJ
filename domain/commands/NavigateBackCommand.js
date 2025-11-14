class NavigateBackCommand {
  constructor(navService) {
    this.navService = navService;
  }
  async execute() {
    try {
      this.navService.goBack();
    } catch (error) {
      console.error('NavigateBackCommand: Falha ao navegar para trás.', error);
    }
  }
}

export default NavigateBackCommand;
