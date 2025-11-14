import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../../../context/AuthContext';
import { defaultAdminStyles } from '../../styles/admin/Default';
import { managementStyles as styles } from '../../styles/admin/Management';
import { AppHeader, Footer, Card, Loading } from '../../ui/admin/Default';
import { useAdminOrderViewModel } from '../../../models/AdminOrderViewModel';
import { adminHomeStyles } from '../../styles/admin/Home';
import { MobileSortableTable } from '../../ui/admin/MobileSortableTable';
const columns = [
  {
    key: 'id',
    label: 'ID',
    sortable: true,
  },
  {
    key: 'status_timeline',
    label: 'Status',
    sortable: false,
    render: (value) => value?.[0]?.title ?? 'N/A',
  },
  {
    key: 'problemAreas',
    label: 'Problemas',
    sortable: false,
    render: (value) => value?.join(', ') ?? 'N/A',
  },
  {
    key: 'updated_at',
    label: 'Últ. Atualização',
    sortable: true,
    render: (value) =>
      value ? new Date(value).toLocaleString('pt-BR') : 'N/A',
  },
  {
    key: 'created_at',
    label: 'Criação',
    sortable: true,
    render: (value) =>
      value ? new Date(value).toLocaleString('pt-BR') : 'N/A',
  },
];
export default function AdminOrderManagementScreen() {
  const { authStatus } = useAuth();
  const { state, actions } = useAdminOrderViewModel();
  const { sortedList: sortedOrders, sortConfig } = state;
  const renderRowActions = (order) => (
    <TouchableOpacity
      style={styles.editButton}
      onPress={() => {
        actions.handleEditOrder(order.id);
      }}>
      <Text style={styles.editButtonText} numberOfLines={1}>
        Editar
      </Text>
    </TouchableOpacity>
  );
  const renderContent = () => {
    if (state.isLoading) {
      return <Loading styleSet={defaultAdminStyles} />;
    }
    if (state.error) {
      return (
        <Card styleSet={defaultAdminStyles}>
          <Text style={styles.errorText}>{state.error}</Text>
        </Card>
      );
    }
    if (!state.orders || state.orders.length === 0) {
      return (
        <Card styleSet={defaultAdminStyles}>
          <Text style={styles.errorText}>Nenhum pedido encontrado.</Text>
        </Card>
      );
    }
    return (
      <>
        {state.priorityOrder && (
          <Card styleSet={defaultAdminStyles} style={styles.priorityCard}>
            <Text style={styles.priorityTitle}>
              PEDIDO PRIORITÁRIO (Mais antigo em aberto)
            </Text>
            <Text style={styles.priorityText}>
              ID: {state.priorityOrder.id} | Status:{' '}
              {state.priorityOrder.statusTimeline?.[0]?.title ?? 'N/A'} |
              Criado:{' '}
              {state.priorityOrder.createdAt
                ? new Date(state.priorityOrder.createdAt).toLocaleDateString(
                    'pt-BR'
                  )
                : 'N/A'}
            </Text>
          </Card>
        )}
        <Text style={adminHomeStyles.pageSubtitle}>
          Total de pedidos: {state.orders.length}
        </Text>
        <Card styleSet={defaultAdminStyles} style={styles.tableCard}>
          <MobileSortableTable
            columns={columns}
            data={sortedOrders}
            sortConfig={sortConfig}
            onSort={actions.handleSort}
            renderRowActions={renderRowActions}
          />
        </Card>
      </>
    );
  };
  return (
    <View style={defaultAdminStyles.container}>
      <AppHeader
        authStatus={authStatus}
        onBackButtonPress={actions.handleBack}
        styleSet={defaultAdminStyles}
      />
      <ScrollView
        contentContainerStyle={defaultAdminStyles.scrollContentContainer}>
        <View style={defaultAdminStyles.content}>
          <Text style={adminHomeStyles.pageTitle}>Gerenciar Pedidos</Text>
          {renderContent()}
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}
