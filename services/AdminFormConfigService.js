import { COMMAND_NAMES, FORM_MODES } from '../core/constants';

class AdminFormConfigService {
  constructor(authService) {
    this.authService = authService;
    this.strategies = {
      [FORM_MODES.ORDER]: {
        title: 'Pedido',
        fetchCommand: COMMAND_NAMES.FETCH_ADMIN_ORDER_DETAILS,
        saveCommand: COMMAND_NAMES.UPDATE_ADMIN_ORDER,
        buildSchema: (data) => this._buildOrderSchema(data),
      },
      [FORM_MODES.USER]: {
        title: 'Usuário',
        fetchCommand: COMMAND_NAMES.FETCH_ADMIN_USER_DETAILS,
        saveCommand: COMMAND_NAMES.UPDATE_ADMIN_USER,
        buildSchema: (data) =>
          this._buildUserSchema(data, this.authService?.currentUser?.role),
      },
    };
  }

  getConfig(mode) {
    const config = this.strategies[mode];
    if (!config) {
      throw new Error(
        `AdminFormConfigService: Nenhuma estratégia encontrada para o modo "${mode}"`
      );
    }
    return config;
  }
  _buildOrderSchema(data) {
    const currentStatus = data.status_timeline?.[0]?.title ?? 'Pendente';
    return [
      {
        key: 'id',
        label: 'ID do Pedido',
        type: 'text',
        readOnly: true,
        defaultValue: data.id || '',
      },
      {
        key: 'status',
        label: 'Novo Status',
        type: 'select',
        defaultValue: currentStatus,
        options: [
          { label: 'Pendente', value: 'Pendente' },
          { label: 'Em Análise', value: 'Em Análise' },
          { label: 'Cancelado', value: 'Cancelado' },
          { label: 'Concluído', value: 'Concluído' },
        ],
      },
      {
        key: 'internal_notes',
        label: 'Notas Internas',
        type: 'textarea',
        defaultValue: data.internal_notes || '',
      },
      {
        key: 'publicUpdateNote',
        label: 'Notas Públicas (visível ao cliente)',
        type: 'textarea',
        defaultValue: '',
      },
      {
        key: 'is_completed',
        label: 'Pedido Concluído',
        type: 'switch',
        defaultValue: data.is_completed || false,
      },
    ];
  }

  _buildUserSchema(data, currentUserRole) {
    if (!data) {
      return [];
    }

    const allRoleOptions = [
      { label: 'Cliente', value: 'client' },
      { label: 'Moderador', value: 'moderator' },
      { label: 'Administrador', value: 'admin' },
    ];

    const defaultRole = data.role ?? 'client';
    let isRoleReadOnly = false;
    let finalRoleOptions = allRoleOptions;

    if (currentUserRole === 'moderator') {
      if (defaultRole === 'admin') {
        isRoleReadOnly = true;
        finalRoleOptions = allRoleOptions;
      } else {
        isRoleReadOnly = false;
        finalRoleOptions = allRoleOptions.filter(
          (opt) => opt.value !== 'admin'
        );
      }
    } else if (currentUserRole === 'admin') {
    } else {
      isRoleReadOnly = true;
    }

    const isDefaultRoleInOptions = finalRoleOptions.some(
      (opt) => opt.value === defaultRole
    );
    if (!isDefaultRoleInOptions) {
    } else {
    }

    return [
      {
        key: 'username',
        label: 'Nome de Usuário',
        type: 'text',
        readOnly: true,
        defaultValue: data.username,
      },
      {
        key: 'role',
        label: 'Permissão',
        type: 'select',
        readOnly: isRoleReadOnly,
        defaultValue: defaultRole,
        options: finalRoleOptions,
      },
      {
        key: 'is_active',
        label: 'Usuário Ativo',
        type: 'switch',
        defaultValue: data.is_active || false,
      },
    ];
  }
}

export default AdminFormConfigService;
