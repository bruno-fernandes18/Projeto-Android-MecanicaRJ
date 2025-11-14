export const COMMAND_NAMES = {
  // Navigation
  NAVIGATE: 'navigate',
  NAVIGATE_BACK: 'navigate_back',
  // Auth
  LOGIN: 'login',
  REGISTER: 'register',
  LOGOUT: 'logout',
  CONTINUE_AS_GUEST: 'continue_as_guest',
  HANDLE_AUTH: 'handle_auth',
  SHOW_AUTH_DIALOG: 'show_auth_dialog',
  // Client
  UPDATE_ORDER_DRAFT: 'update_order_draft',
  REGISTER_ORDER: 'register_order',
  FETCH_ORDER_DETAILS: 'fetch_order_details',
  FETCH_USER_ORDERS: 'fetch_user_orders',
  // Admin
  FETCH_ADMIN_ORDERS: 'fetch_admin_orders',
  FETCH_ADMIN_ORDER_DETAILS: 'fetch_admin_order_details',
  UPDATE_ADMIN_ORDER: 'update_admin_order',
  FETCH_ADMIN_USERS: 'fetch_admin_users',
  FETCH_ADMIN_USER_DETAILS: 'fetch_admin_user_details',
  UPDATE_ADMIN_USER: 'update_admin_user',
  FETCH_ADMIN_STATISTICS: 'fetch_admin_statistics',
  // UI
  SHOW_ALERT: 'show_alert',
};

export const FORM_MODES = {
  ORDER: 'order',
  USER: 'user',
};

export const AUTH_STATUS = {
  LOADING: 'loading',
  AUTHENTICATED: 'authenticated',
  UNAUTHENTICATED: 'unauthenticated',
  GUEST: 'guest',
};
