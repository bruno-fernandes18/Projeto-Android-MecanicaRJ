import { getDefaultOrderDraft } from '../models/OrderModel';

class OrderDraftService {
  constructor() {
    this.draft = getDefaultOrderDraft();
  }
  getDraft() {
    return { ...this.draft };
  }
  updateDraft(partialDraft) {
    this.draft = { ...this.draft, ...partialDraft };
  }
  clearDraft() {
    this.draft = getDefaultOrderDraft();
  }
}

export default OrderDraftService;
