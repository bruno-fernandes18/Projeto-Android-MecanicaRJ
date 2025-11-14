class UpdateAdminOrderCommand {
  constructor(payload, authService, apiService) {
    if (!payload || !payload.id || !payload.data || !payload.updated_at) {
      throw new Error(
        'UpdateAdminOrderCommand: "id", "data", and "updated_at" are required.'
      );
    }
    this.payload = payload;
    this.authService = authService;
    this.apiService = apiService;
  }

  async execute() {
    if (!this.authService.isAdminOrModerator()) {
      throw new Error('Permission denied.');
    }

    const { id, data, updated_at } = this.payload;
    const { publicUpdateNote, ...orderData } = data;

    try {
      const updateData = await this.apiService.updateAdminOrder(
        id,
        orderData,
        updated_at,
        publicUpdateNote
      );
      return { success: true, data: updateData };
    } catch (error) {
      console.error(
        'UpdateAdminOrderCommand: Failed to update order',
        error.message
      );
      return { success: false, message: error.message || 'Failed to save.' };
    }
  }
}
export default UpdateAdminOrderCommand;
