class RegisterCommand {
  constructor(payload, authService) {
    this.payload = payload;
    this.authService = authService;
  }

  async execute() {
    try {
      const response = await this.authService.register(
        this.payload.username,
        this.payload.email,
        this.payload.password
      );

      if (response.success) {
        return { success: true };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}

export default RegisterCommand;
