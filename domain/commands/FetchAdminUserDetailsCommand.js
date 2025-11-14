class FetchAdminUserDetailsCommand {
  constructor(payload, authService, apiService) {
    if (!payload || !payload.id) {
      throw new Error('FetchAdminUserDetailsCommand: "id" is required.');
    }
    this.id = payload.id;
    this.authService = authService;
    this.apiService = apiService;
  }

  async execute() {
    if (!this.authService.isAdminOrModerator()) {
      throw new Error('Permission denied.');
    }
    try {
      const data = await this.apiService.fetchAdminUserDetails(this.id);
      return data;
    } catch (error) {
      console.error(
        'FetchAdminUserDetailsCommand: Failed to fetch user',
        error.message
      );
      throw new Error(error.message || 'Failed to fetch user details.');
    }
  }
}
export default FetchAdminUserDetailsCommand;
