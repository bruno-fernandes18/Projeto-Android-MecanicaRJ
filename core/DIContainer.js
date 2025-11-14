class DIContainer {
  constructor() {
    this.services = new Map();
  }

  register(key, serviceInstance) {
    if (this.services.has(key)) {
      console.warn(`DIContainer: Service key "${key}" is already registered.`);
    }
    this.services.set(key, serviceInstance);
  }

  resolve(key) {
    const serviceInstance = this.services.get(key);
    if (!serviceInstance) {
      throw new Error(`DIContainer: No service registered for key "${key}"`);
    }
    return serviceInstance;
  }
}

const containerInstance = new DIContainer();
export default containerInstance;
