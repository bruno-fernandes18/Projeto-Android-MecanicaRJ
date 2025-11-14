import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../../../context/AuthContext';
import { defaultAdminStyles } from '../../styles/admin/Default';
import { managementStyles as styles } from '../../styles/admin/Management';
import { AppHeader, Footer, Card, Loading } from '../../ui/admin/Default';
import { useAdminUserViewModel } from '../../../models/AdminUserViewModel';
import { adminHomeStyles } from '../../styles/admin/Home';
import { MobileSortableTable } from '../../ui/admin/MobileSortableTable';
const columns = [
  {
    key: 'username',
    label: 'Usuário',
    sortable: true,
  },
  {
    key: 'role',
    label: 'Permissão',
    sortable: true,
  },
  {
    key: 'createdAt',
    label: 'Data Criação',
    sortable: true,
    render: (value) =>
      value ? new Date(value).toLocaleString('pt-BR') : 'N/A',
  },
];
export default function AdminUsersManagementScreen() {
  const { authStatus } = useAuth();
  const { state, actions } = useAdminUserViewModel();
  const { sortedList: sortedUsers, sortConfig } = state;
  const renderRowActions = (user) => (
    <TouchableOpacity
      style={styles.editButton}
      onPress={() => actions.handleEditUser(user.id)}>
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
    return (
      <>
        <Text style={adminHomeStyles.pageSubtitle}>
          Total de usuários: {state.users.length}
        </Text>
        <Card styleSet={defaultAdminStyles} style={styles.tableCard}>
          <MobileSortableTable
            columns={columns}
            data={sortedUsers}
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
          <Text style={adminHomeStyles.pageTitle}>Gerenciar Usuários</Text>
          {renderContent()}
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}
