class FetchAdminUsersCommand {
  constructor(authService, apiService) {
    this.authService = authService;
    this.apiService = apiService;
  }

  async execute() {
    if (!this.authService.isAdminOrModerator()) {
      throw new Error('Permission denied.');
    }
    try {
      const data = await this.apiService.fetchAdminUsers();
      return data;
    } catch (error) {
      console.error(
        'FetchAdminUsersCommand: Failed to fetch users',
        error.message
      );
      return [];
    }
  }
}
export default FetchAdminUsersCommand;
