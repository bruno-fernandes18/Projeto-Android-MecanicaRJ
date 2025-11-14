class UpdateAdminUserCommand {
  constructor(payload, authService, apiService) {
    if (!payload || !payload.id || !payload.data || !payload.updated_at) {
      throw new Error(
        'UpdateAdminUserCommand: "id", "data", and "updated_at" are required.'
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
    console.log(
      `[UpdateAdminUserCommand] Iniciando atualização para Usuário ID: ${id}`
    );

    try {
      const updateData = await this.apiService.updateAdminUser(
        id,
        data,
        updated_at
      );

      console.log('[UpdateAdminUserCommand] Usuário atualizado com sucesso.');
      return { success: true, data: updateData };
    } catch (error) {
      console.error(
        '[UpdateAdminUserCommand] FALHA ao atualizar usuário:',
        error.message
      );
      return { success: false, message: error.message || 'Failed to save.' };
    }
  }
}
export default UpdateAdminUserCommand;
