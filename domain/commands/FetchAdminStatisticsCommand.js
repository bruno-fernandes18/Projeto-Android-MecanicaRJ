class FetchAdminStatisticsCommand {
  constructor(authService, apiService) {
    this.authService = authService;
    this.apiService = apiService;
  }

  async execute() {
    if (!this.authService.isAdminOrModerator()) {
      throw new Error('Permission denied.');
    }
    try {
      const data = await this.apiService.fetchAdminStatistics();
      return data;
    } catch (error) {
      console.error(
        'FetchAdminStatisticsCommand: Failed to fetch stats',
        error.message
      );
      return null;
    }
  }
}
export default FetchAdminStatisticsCommand;
