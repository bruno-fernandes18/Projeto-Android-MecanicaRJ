class FetchUserOrdersCommand {
  constructor(authService, apiService) {
    this.authService = authService;
    this.apiService = apiService;
  }

  async execute() {
    if (!this.authService.isUserAuthenticated()) {
      console.error('FetchUserOrdersCommand: User not authenticated.');
      return [];
    }

    try {
      const data = await this.apiService.fetchUserOrders();
      return data.map((order) => ({
        ...order,
        currentStatus: order.status || 'Pendente',
      }));
    } catch (error) {
      console.error(
        'FetchUserOrdersCommand: Failed to fetch orders.',
        error.message
      );
      return [];
    }
  }
}

export default FetchUserOrdersCommand;
