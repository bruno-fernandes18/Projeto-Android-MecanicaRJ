import { supabase } from '../core/config';

class BaseService {
  constructor(authService) {
    if (!authService) {
      throw new Error('Valid AuthService instance is required!');
    }
    this.authService = authService;
  }

  _validateAuth() {
    if (!this.authService?.isUserAuthenticated?.()) {
      throw new Error('User is not authenticated.');
    }
  }

  _getUserId() {
    this._validateAuth();
    const userId = this.authService.currentUser?.id;
    if (!userId) {
      throw new Error('Could not retrieve authenticated user ID.');
    }
    return userId;
  }

  _validateAdmin() {
    if (!this.authService?.isAdminOrModerator?.()) {
      throw new Error('User does not have admin/moderator privileges.');
    }
  }

  _getUserRole() {
    this._validateAdmin();
    const role = this.authService.currentUser?.role;
    if (!role) {
      throw new Error('Could not retrieve authenticated user role.');
    }
    return role;
  }
}

class OrderService extends BaseService {
  async registerOrder(draft) {
    const userId = this._getUserId();

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([
        {
          user_id: userId,
          is_wash: draft.is_wash || false,
          is_only_wash: draft.is_only_wash || false,
          problems_brake: draft.problems_brake || false,
          problems_tire: draft.problems_tire || false,
          problems_engine: draft.problems_engine || false,
          problems_electric: draft.problems_electric || false,
          problems_fluids: draft.problems_fluids || false,
          description: draft.description || '',
        },
      ])
      .select()
      .single();

    if (orderError) {
      throw orderError;
    }

    const { error: statusError } = await supabase
      .from('status_timeline')
      .insert([
        {
          order_id: order.id,
          title: 'Pendente',
          description: 'Seu pedido foi recebido e está aguardando análise.',
        },
      ]);

    if (statusError) {
      throw statusError;
    }

    return order;
  }

  async fetchUserOrders() {
    const userId = this._getUserId();

    const { data, error } = await supabase
      .from('orders_with_status')
      .select(
        `
        id,
        created_at,
        status
      `
      )
      .eq('user_id', userId)
      .not('created_at', 'is', null)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data || [];
  }

  async fetchOrderDetails(orderId) {
    const userId = this._getUserId();
    const { data, error } = await supabase
      .from('orders')
      .select(
        `
        *,
        status_timeline (*)
      `
      )
      .eq('id', orderId)
      .eq('user_id', userId)
      .order('timestamp', { foreignTable: 'status_timeline', ascending: true })
      .single();

    if (error) throw error;
    return data;
  }
}

class AdminOrderService extends BaseService {
  async fetchAdminOrders() {
    this._validateAdmin();

    const { data, error } = await supabase
      .from('orders_with_status')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data || [];
  }

  async fetchAdminOrderDetails(orderId) {
    this._validateAdmin();
    const { data, error } = await supabase
      .from('orders')
      .select(
        `
        *,
        status_timeline (*)
      `
      )
      .eq('id', orderId)
      .order('timestamp', { foreignTable: 'status_timeline', ascending: false })
      .single();

    if (error) throw error;
    return data;
  }

  async updateAdminOrder(id, orderData, originalUpdatedAt, publicUpdateNote) {
    const currentUserRole = this._getUserRole();

    await this._checkOrderPermissions(id, currentUserRole);

    const updateData = await this._updateOrder(
      id,
      orderData,
      originalUpdatedAt,
      currentUserRole
    );

    if (publicUpdateNote?.trim()) {
      await this._addTimelineNote(id, 'Atualização', publicUpdateNote);
    }

    return updateData;
  }

  async _checkOrderPermissions(orderId, currentUserRole) {
    const { data: currentOrder, error } = await supabase
      .from('orders')
      .select('last_edited_by_role')
      .eq('id', orderId)
      .single();

    if (error) throw new Error('Failed to fetch order for permission check.');

    if (
      currentUserRole === 'moderator' &&
      currentOrder.last_edited_by_role === 'admin'
    ) {
      throw new Error(
        'Permission denied: Moderators cannot edit items last modified by an administrator.'
      );
    }
  }

  async _updateOrder(id, orderData, originalUpdatedAt, currentUserRole) {
    const {
      status,
      status_timeline,
      publicUpdateNote,
      ...orderDataWithoutStatus
    } = orderData;
    orderDataWithoutStatus.last_edited_by_role = currentUserRole;

    const { data, error } = await supabase
      .from('orders')
      .update(orderDataWithoutStatus)
      .eq('id', id)
      .eq('updated_at', originalUpdatedAt)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        throw new Error(
          '409 Conflict: Data has been modified by another user. Please refresh.'
        );
      }
      throw error;
    }

    if (status) {
      await this._addTimelineNote(
        id,
        status,
        `Status atualizado para: ${status}`
      );
    }

    return data;
  }

  async _addTimelineNote(orderId, status, note) {
    const { error } = await supabase.from('status_timeline').insert({
      order_id: orderId,
      title: status,
      description: note,
    });

    if (error) {
      throw error;
    }
  }
}

class AdminUserService extends BaseService {
  async fetchAdminUsers() {
    this._validateAdmin();
    const { data, error } = await supabase
      .from('users')
      .select('id, username, role, created_at');

    if (error) throw error;
    return data;
  }

  async fetchAdminUserDetails(userId) {
    this._validateAdmin();
    const { data, error } = await supabase
      .from('users')
      .select('id, username, role, is_active, updated_at')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  }

  async updateAdminUser(id, userData, originalUpdatedAt) {
    const currentUserRole = this._getUserRole();
    await this._checkUserPermissions(id, userData, currentUserRole);
    return await this._updateUser(
      id,
      userData,
      originalUpdatedAt,
      currentUserRole
    );
  }

  async _checkUserPermissions(userId, userData, currentUserRole) {
    const { data: targetUser, error } = await supabase
      .from('users')
      .select('role, last_edited_by_role')
      .eq('id', userId)
      .single();

    if (error) throw new Error('Failed to fetch target user.');

    if (
      currentUserRole === 'moderator' &&
      targetUser.last_edited_by_role === 'admin'
    ) {
      throw new Error(
        'Permission denied: Moderators cannot edit items last modified by an administrator.'
      );
    }

    if (
      currentUserRole === 'moderator' &&
      userData.role === 'admin' &&
      targetUser.role !== 'admin'
    ) {
      throw new Error(
        'Permission denied: Moderators cannot promote users to administrator.'
      );
    }
  }

  async _updateUser(id, userData, originalUpdatedAt, currentUserRole) {
    userData.last_edited_by_role = currentUserRole;

    let query = supabase.from('users').update(userData).eq('id', id);

    if (originalUpdatedAt) {
      query = query.eq('updated_at', originalUpdatedAt);
    }

    const { data, error } = await query.select().single();

    if (error) {
      if (error.code === 'PGRST116') {
        throw new Error(
          '409 Conflict: Data has been modified by another user. Please refresh.'
        );
      }
      throw error;
    }
    return data;
  }
}

class StatisticsService extends BaseService {
  async fetchAdminStatistics() {
    this._validateAdmin();
    try {
      const { data, error } = await supabase.rpc('get_admin_statistics');
      if (!error) return data;
    } catch (error) {}

    return await this._calculateStatisticsClientSide();
  }

  async _calculateStatisticsClientSide() {
    try {
      const [usersResult, ordersResult] = await Promise.all([
        supabase.from('users').select('id', { count: 'exact', head: true }),
        supabase
          .from('orders')
          .select(
            'is_completed, problems_brake, problems_tire, problems_engine, problems_electric, problems_fluids, status_timeline(title)'
          ),
      ]);

      if (usersResult.error) throw usersResult.error;
      if (ordersResult.error) throw ordersResult.error;

      const totalUsers = usersResult.count;
      const ordersData = ordersResult.data;

      let openOrders = 0;
      let analysisOrders = 0;
      let completedOrders = 0;
      const problemCounts = {
        Freios: 0,
        Pneus: 0,
        Motor: 0,
        Elétrica: 0,
        Fluidos: 0,
      };

      ordersData.forEach((order) => {
        const status = order.status_timeline?.[0]?.title ?? 'Pendente';
        if (order.is_completed) {
          completedOrders++;
        } else if (status === 'Em Análise') {
          analysisOrders++;
        } else if (status === 'Pendente') {
          openOrders++;
        }

        if (order.problems_brake) problemCounts.Freios++;
        if (order.problems_tire) problemCounts.Pneus++;
        if (order.problems_engine) problemCounts.Motor++;
        if (order.problems_electric) problemCounts.Elétrica++;
        if (order.problems_fluids) problemCounts.Fluidos++;
      });

      const mostCommonProblem = Object.keys(problemCounts).reduce(
        (a, b) => (problemCounts[a] > problemCounts[b] ? a : b),
        'N/A'
      );

      return {
        totalUsers,
        openOrders: openOrders + analysisOrders,
        mostCommonProblem,
        statsDistribution: {
          open: openOrders,
          analysis: analysisOrders,
          complete: completedOrders,
        },
      };
    } catch (error) {
      throw error;
    }
  }
}

class ApiService {
  constructor(authService) {
    if (!authService) {
      throw new Error('AuthService is required for ApiService');
    }

    this.orderService = new OrderService(authService);
    this.adminOrderService = new AdminOrderService(authService);
    this.adminUserService = new AdminUserService(authService);
    this.statisticsService = new StatisticsService(authService);
  }

  async registerOrder(draft) {
    return this.orderService.registerOrder(draft);
  }

  async fetchUserOrders() {
    return this.orderService.fetchUserOrders();
  }

  async fetchOrderDetails(orderId) {
    return this.orderService.fetchOrderDetails(orderId);
  }

  async fetchAdminOrders() {
    return this.adminOrderService.fetchAdminOrders();
  }

  async fetchAdminOrderDetails(orderId) {
    return this.adminOrderService.fetchAdminOrderDetails(orderId);
  }

  async updateAdminOrder(id, orderData, originalUpdatedAt, publicUpdateNote) {
    return this.adminOrderService.updateAdminOrder(
      id,
      orderData,
      originalUpdatedAt,
      publicUpdateNote
    );
  }

  async fetchAdminUsers() {
    return this.adminUserService.fetchAdminUsers();
  }

  async fetchAdminUserDetails(userId) {
    return this.adminUserService.fetchAdminUserDetails(userId);
  }

  async updateAdminUser(id, userData, originalUpdatedAt) {
    return this.adminUserService.updateAdminUser(
      id,
      userData,
      originalUpdatedAt
    );
  }

  async fetchAdminStatistics() {
    return this.statisticsService.fetchAdminStatistics();
  }
}

export default ApiService;
