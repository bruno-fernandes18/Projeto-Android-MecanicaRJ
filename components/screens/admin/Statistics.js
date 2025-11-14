import { View, ScrollView, Text } from 'react-native';
import { useAuth } from '../../../context/AuthContext';
import { defaultAdminStyles } from '../../styles/admin/Default';
import { statisticsStyles as styles } from '../../styles/admin/Statistics';
import { AppHeader, Footer, Loading, Card } from '../../ui/admin/Default';
import { adminHomeStyles } from '../../styles/admin/Home';
import { useAdminStatisticsViewModel } from '../../../models/AdminStatisticsViewModel';
import { StatCard, PieChartLegend } from '../../ui/admin/Statistics';
import PieChart from '../../ui/common/PieChart';
export default function AdminStatisticsScreen() {
  const { authStatus } = useAuth();
  const { state, actions } = useAdminStatisticsViewModel();
  const calculateCompletionRate = () => {
    if (!state.stats) return '0%';
    const openOrders = state.stats.openOrders || 0;
    const totalUsers = state.stats.totalUsers || 0;
    if (openOrders === 0) return '100%';
    const rate = Math.round((totalUsers / openOrders) * 100);
    return `${Math.min(rate, 100)}%`;
  };
  const renderContent = () => {
    if (state.isLoading) {
      return <Loading />;
    }
    if (state.error) {
      return (
        <Card>
          <Text style={styles.errorText}>{state.error}</Text>
        </Card>
      );
    }
    if (!state.stats) {
      return (
        <Card>
          <Text style={styles.errorText}>Nenhuma estatística encontrada.</Text>
        </Card>
      );
    }
    return (
      <View style={styles.container}>
        <StatCard title="Pedidos Abertos" value={state.stats.openOrders} />
        <StatCard title="Total de Usuários" value={state.stats.totalUsers} />
        <StatCard
          title="Problema Mais Comum"
          subtext={state.stats.mostCommonProblem}
        />
        <StatCard title="Taxa de Conclusão" value={calculateCompletionRate()} />
        <View style={[styles.statCard, styles.chartCard]}>
          <Text style={styles.statTitle}>Distribuição de Pedidos</Text>
          <PieChart
            slices={state.pieChartSlices}
            radius={90}
            strokeWidth={25}
            style={styles.pieChartContainer}
          />
          {state.pieChartData && <PieChartLegend data={state.pieChartData} />}
        </View>
      </View>
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
          <Text style={adminHomeStyles.pageTitle}>Estatísticas</Text>
          {renderContent()}
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}
