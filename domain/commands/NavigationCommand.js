class NavigateCommand {
  constructor(payload, navService) {
    this.payload = payload; // { screenName, params }
    this.navService = navService;
  }

  async execute() {
    const { screenName, params } = this.payload;
    if (!screenName) {
      console.error(
        "NavigateCommand: 'screenName' was not provided in payload."
      );
      return;
    }
    this.navService.navigate(screenName, params);
  }
}

export default NavigateCommand;
