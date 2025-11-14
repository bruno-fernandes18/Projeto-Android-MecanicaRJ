class StatePersistenceService {
  constructor() {
    this.pendingAction = null;
  }

  savePendingAction(context) {
    this.pendingAction = context;
  }
  loadPendingAction() {
    const context = this.pendingAction;
    this.pendingAction = null;
    return context;
  }
  hasPendingAction() {
    return this.pendingAction !== null;
  }
}

export default StatePersistenceService;
