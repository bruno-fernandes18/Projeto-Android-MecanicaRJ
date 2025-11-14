class Maestro {
  constructor(factory) {
    if (!factory) {
      throw new Error('Maestro requires a CommandFactory instance.');
    }
    this.factory = factory;
  }

  async execute(commandName, payload) {
    try {
      const command = this.factory.create(commandName, payload);
      const result = await command.execute();
      return result;
    } catch (error) {
      console.error(`Maestro execution failed for: ${commandName}`, error);
      throw error;
    }
  }
}

export default Maestro;
