class LogoutCommand {
  constructor(authService, navService) {
    this.authService = authService;
    this.navService = navService;
  }

  async execute() {
    const result = await this.authService.logout();
    this.navService.reset('Entry');
    return result;
  }
}

export default LogoutCommand;
