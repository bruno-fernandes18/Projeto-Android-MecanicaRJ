class CommandFactory {
  constructor(diContainer) {
    this.diContainer = diContainer;
    this.commandRegistry = new Map();
  }

  registerCommand(commandName, commandFactory) {
    if (this.commandRegistry.has(commandName)) {
      console.warn(`CommandFactory: "${commandName}" is already registered.`);
    }
    this.commandRegistry.set(commandName, commandFactory);
  }

  create(commandName, payload) {
    const commandFactory = this.commandRegistry.get(commandName);
    if (!commandFactory) {
      throw new Error(
        `CommandFactory: No registered factory for key "${commandName}"`
      );
    }
    return commandFactory(payload);
  }
}

export default CommandFactory;
