class FetchAdminOrdersCommand {
  constructor(authService, apiService) {
    this.authService = authService;
    this.apiService = apiService;
  }
  async execute() {
    if (!this.authService.isAdminOrModerator()) {
      throw new Error('Permission denied.');
    }
    try {
      const data = await this.apiService.fetchAdminOrders();
      const processedData = data.map((order) => {
        const problemAreas = [];
        if (order.problems_brake) problemAreas.push('Freios');
        if (order.problems_tire) problemAreas.push('Pneus');
        if (order.problems_engine) problemAreas.push('Motor');
        if (order.problems_electric) problemAreas.push('Elétrica');
        if (order.problems_fluids) problemAreas.push('Fluidos');
        return {
          ...order,
          problemAreas: problemAreas,
        };
      });

      return processedData;
    } catch (error) {
      console.error(
        'FetchAdminOrdersCommand: Failed to fetch orders',
        error.message
      );
      return [];
    }
  }
}
export default FetchAdminOrdersCommand;
