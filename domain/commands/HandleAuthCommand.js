import { COMMAND_NAMES } from '../../core/constants';

class HandleAuthCommand {
  constructor(persistenceService, maestro, authService) {
    this.persistenceService = persistenceService;
    this.maestro = maestro;
    this.authService = authService;
  }

  async execute() {
    const pendingAction = this.persistenceService.loadPendingAction();

    if (pendingAction) {
      if (pendingAction.screenName) {
        await this.maestro.execute(COMMAND_NAMES.NAVIGATE, pendingAction);
      } else if (pendingAction.commandName) {
        await this.maestro.execute(
          pendingAction.commandName,
          pendingAction.context || {}
        );
      } else {
        await this.maestro.execute(COMMAND_NAMES.NAVIGATE, {
          screenName: 'ClientHome',
        });
      }
    } else {
      const isAdmin = this.authService.isAdminOrModerator();
      if (isAdmin) {
        await this.maestro.execute(COMMAND_NAMES.NAVIGATE, {
          screenName: 'AdminHome',
        });
      } else {
        await this.maestro.execute(COMMAND_NAMES.NAVIGATE, {
          screenName: 'ClientHome',
        });
      }
    }
  }
}

export default HandleAuthCommand;
