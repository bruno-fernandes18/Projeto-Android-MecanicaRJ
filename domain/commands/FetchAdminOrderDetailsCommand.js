class FetchAdminOrderDetailsCommand {
  constructor(payload, authService, apiService) {
    if (!payload || !payload.id) {
      throw new Error('FetchAdminOrderDetailsCommand: "id" is required.');
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
      const data = await this.apiService.fetchAdminOrderDetails(this.id);
      return data;
    } catch (error) {
      console.error(
        'FetchAdminOrderDetailsCommand: Failed to fetch order',
        error.message
      );
      throw new Error(error.message || 'Failed to fetch order details.');
    }
  }
}
export default FetchAdminOrderDetailsCommand;
