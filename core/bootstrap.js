import { COMMAND_NAMES } from './constants';
import DIContainer from './DIContainer';
import CommandFactory from '../domain/CommandFactory';
import Maestro from '../domain/Maestro';
import AuthService from '../services/AuthService';
import ApiService from '../services/ApiService';
import NavigationService from '../services/NavigationService';
import InteractionService from '../services/InteractionService';
import StatePersistenceService from '../services/StatePersistenceService';
import OrderDraftService from '../services/OrderDraftService';
import TimelineViewModelService from '../services/TimelineViewModelService';
import AdminFormConfigService from '../services/AdminFormConfigService';
import ShowAuthDialogCommand from '../domain/commands/ShowAuthDialogCommand';
import NavigateCommand from '../domain/commands/NavigationCommand';
import LoginCommand from '../domain/commands/LoginCommand';
import RegisterCommand from '../domain/commands/RegisterCommand';
import ContinueAsGuestCommand from '../domain/commands/ContinueAsGuestCommand';
import HandleAuthCommand from '../domain/commands/HandleAuthCommand';
import UpdateOrderDraftCommand from '../domain/commands/UpdateOrderDraftCommand';
import RegisterOrderCommand from '../domain/commands/RegisterOrderCommand';
import FetchOrderDetailsCommand from '../domain/commands/FetchOrderDetailsCommand';
import FetchUserOrdersCommand from '../domain/commands/FetchUserOrdersCommand';
import LogoutCommand from '../domain/commands/LogoutCommand';
import NavigateBackCommand from '../domain/commands/NavigateBackCommand';
import FetchAdminOrdersCommand from '../domain/commands/FetchAdminOrdersCommand';
import FetchAdminUsersCommand from '../domain/commands/FetchAdminUsersCommand';
import FetchAdminStatisticsCommand from '../domain/commands/FetchAdminStatisticsCommand';
import ShowAlertCommand from '../domain/commands/ShowAlertCommand';
import FetchAdminOrderDetailsCommand from '../domain/commands/FetchAdminOrderDetailsCommand';
import UpdateAdminOrderCommand from '../domain/commands/UpdateAdminOrderCommand';
import FetchAdminUserDetailsCommand from '../domain/commands/FetchAdminUserDetailsCommand';
import UpdateAdminUserCommand from '../domain/commands/UpdateAdminUserCommand';

export default async function bootstrap() {
  // 1. SERVICE INSTANTIATION
  const authService = new AuthService();
  const statePersistenceService = new StatePersistenceService();
  const orderDraftService = new OrderDraftService();
  const navigationService = new NavigationService();
  const interactionService = new InteractionService();
  const timelineViewModelService = new TimelineViewModelService();
  const apiService = new ApiService(authService);
  const adminFormConfigService = new AdminFormConfigService(authService);
  const commandFactory = new CommandFactory(DIContainer);
  const maestro = new Maestro(commandFactory);

  // 2. SERVICES REGISTER
  DIContainer.register('IAuthService', authService);
  DIContainer.register('IApiService', apiService);
  DIContainer.register('IStatePersistenceService', statePersistenceService);
  DIContainer.register('IOrderDraftService', orderDraftService);
  DIContainer.register('INavigationService', navigationService);
  DIContainer.register('IInteractionService', interactionService);
  DIContainer.register('ITimelineViewModelService', timelineViewModelService);
  DIContainer.register('IAdminFormConfigService', adminFormConfigService);
  DIContainer.register('ICommandFactory', commandFactory);
  DIContainer.register('IMaestro', maestro);

  // 3. COMMANDS REGISTER
  commandFactory.registerCommand(
    COMMAND_NAMES.NAVIGATE,
    (payload) =>
      new NavigateCommand(payload, DIContainer.resolve('INavigationService'))
  );
  commandFactory.registerCommand(
    COMMAND_NAMES.NAVIGATE_BACK,
    () => new NavigateBackCommand(DIContainer.resolve('INavigationService'))
  );
  commandFactory.registerCommand(
    COMMAND_NAMES.LOGIN,
    (payload) => new LoginCommand(payload, DIContainer.resolve('IAuthService'))
  );
  commandFactory.registerCommand(
    COMMAND_NAMES.REGISTER,
    (payload) =>
      new RegisterCommand(payload, DIContainer.resolve('IAuthService'))
  );
  commandFactory.registerCommand(
    COMMAND_NAMES.LOGOUT,
    () =>
      new LogoutCommand(
        DIContainer.resolve('IAuthService'),
        DIContainer.resolve('INavigationService')
      )
  );
  commandFactory.registerCommand(
    COMMAND_NAMES.CONTINUE_AS_GUEST,
    (payload) =>
      new ContinueAsGuestCommand(
        payload,
        DIContainer.resolve('IStatePersistenceService'),
        DIContainer.resolve('IInteractionService'),
        DIContainer.resolve('IMaestro'),
        DIContainer.resolve('IOrderDraftService')
      )
  );
  commandFactory.registerCommand(
    COMMAND_NAMES.HANDLE_AUTH,
    () =>
      new HandleAuthCommand(
        DIContainer.resolve('IStatePersistenceService'),
        DIContainer.resolve('IMaestro'),
        DIContainer.resolve('IAuthService')
      )
  );
  commandFactory.registerCommand(
    COMMAND_NAMES.SHOW_AUTH_DIALOG,
    (payload) =>
      new ShowAuthDialogCommand(
        payload,
        DIContainer.resolve('IInteractionService'),
        DIContainer.resolve('IMaestro'),
        DIContainer.resolve('IStatePersistenceService')
      )
  );
  commandFactory.registerCommand(
    COMMAND_NAMES.SHOW_ALERT,
    (payload) =>
      new ShowAlertCommand(payload, DIContainer.resolve('IInteractionService'))
  );
  commandFactory.registerCommand(
    COMMAND_NAMES.UPDATE_ORDER_DRAFT,
    (payload) =>
      new UpdateOrderDraftCommand(
        payload,
        DIContainer.resolve('IOrderDraftService')
      )
  );
  commandFactory.registerCommand(
    COMMAND_NAMES.REGISTER_ORDER,
    () =>
      new RegisterOrderCommand(
        DIContainer.resolve('IAuthService'),
        DIContainer.resolve('IOrderDraftService'),
        DIContainer.resolve('IApiService'),
        DIContainer.resolve('IMaestro'),
        DIContainer.resolve('IStatePersistenceService'),
        DIContainer.resolve('IInteractionService')
      )
  );
  commandFactory.registerCommand(
    COMMAND_NAMES.FETCH_ORDER_DETAILS,
    (payload) =>
      new FetchOrderDetailsCommand(
        payload,
        DIContainer.resolve('IAuthService'),
        DIContainer.resolve('IApiService'),
        DIContainer.resolve('ITimelineViewModelService')
      )
  );
  commandFactory.registerCommand(
    COMMAND_NAMES.FETCH_USER_ORDERS,
    () =>
      new FetchUserOrdersCommand(
        DIContainer.resolve('IAuthService'),
        DIContainer.resolve('IApiService')
      )
  );
  commandFactory.registerCommand(
    COMMAND_NAMES.FETCH_ADMIN_ORDERS,
    () =>
      new FetchAdminOrdersCommand(
        DIContainer.resolve('IAuthService'),
        DIContainer.resolve('IApiService')
      )
  );
  commandFactory.registerCommand(
    COMMAND_NAMES.FETCH_ADMIN_USERS,
    () =>
      new FetchAdminUsersCommand(
        DIContainer.resolve('IAuthService'),
        DIContainer.resolve('IApiService')
      )
  );
  commandFactory.registerCommand(
    COMMAND_NAMES.FETCH_ADMIN_STATISTICS,
    () =>
      new FetchAdminStatisticsCommand(
        DIContainer.resolve('IAuthService'),
        DIContainer.resolve('IApiService')
      )
  );
  commandFactory.registerCommand(
    COMMAND_NAMES.FETCH_ADMIN_ORDER_DETAILS,
    (payload) =>
      new FetchAdminOrderDetailsCommand(
        payload,
        DIContainer.resolve('IAuthService'),
        DIContainer.resolve('IApiService')
      )
  );
  commandFactory.registerCommand(
    COMMAND_NAMES.UPDATE_ADMIN_ORDER,
    (payload) =>
      new UpdateAdminOrderCommand(
        payload,
        DIContainer.resolve('IAuthService'),
        DIContainer.resolve('IApiService')
      )
  );
  commandFactory.registerCommand(
    COMMAND_NAMES.FETCH_ADMIN_USER_DETAILS,
    (payload) =>
      new FetchAdminUserDetailsCommand(
        payload,
        DIContainer.resolve('IAuthService'),
        DIContainer.resolve('IApiService')
      )
  );
  commandFactory.registerCommand(
    COMMAND_NAMES.UPDATE_ADMIN_USER,
    (payload) =>
      new UpdateAdminUserCommand(
        payload,
        DIContainer.resolve('IAuthService'),
        DIContainer.resolve('IApiService')
      )
  );

  // 4. APPLICATION INITIALIZATION
  await authService.init();
  console.log('Application bootstrapped.');
}
