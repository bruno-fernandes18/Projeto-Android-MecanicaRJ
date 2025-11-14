class UpdateOrderDraftCommand {
  constructor(payload, orderDraftService) {
    this.payload = payload;
    this.orderDraftService = orderDraftService;
  }
  async execute() {
    this.orderDraftService.updateDraft(this.payload);
  }
}

export default UpdateOrderDraftCommand;
