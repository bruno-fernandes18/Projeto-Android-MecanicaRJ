export const ORDER_DESCRIPTION_MAX_LENGTH = 400;
export const getDefaultOrderDraft = () => ({
  is_wash: false,
  problems_brake: false,
  problems_tire: false,
  problems_engine: false,
  problems_electric: false,
  problems_fluids: false,
  description: '',
});
