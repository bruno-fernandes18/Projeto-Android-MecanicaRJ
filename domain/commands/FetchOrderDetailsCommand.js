class FetchOrderDetailsCommand {
  constructor(payload, authService, apiService, timelineService) {
    if (!payload || !payload.orderId) {
      throw new Error(
        'FetchOrderDetailsCommand: "orderId" is required in payload.'
      );
    }
    this.payload = payload;
    this.authService = authService;
    this.apiService = apiService;
    this.timelineService = timelineService;
  }

  async execute() {
    const { orderId } = this.payload;
    if (!this.authService.isUserAuthenticated()) {
      return this.timelineService.getConnectionErrorViewModel();
    }

    try {
      const data = await this.apiService.fetchOrderDetails(orderId);
      return this.timelineService.processOrder(data);
    } catch (error) {
      console.error(
        'FetchOrderDetailsCommand: Failed to fetch details',
        error.message
      );
      return this.timelineService.getConnectionErrorViewModel();
    }
  }
}
export default FetchOrderDetailsCommand;
