import { ScrollView, Text, View } from 'react-native';
import { AppHeader, Loading } from '../../ui/client/Default';
import { OrderTimeline, OrderList } from '../../ui/client/TrackOrder';
import { ClientDefaultStyle } from '../../styles/client/Default';
import { TrackOrderClientStyles } from '../../styles/client/TrackOrder';
import { useClientTrackOrderViewModel } from '../../../models/ClientTrackOrderViewModel';

export default function ClientTrackOrder() {
  const { state, actions, auth } = useClientTrackOrderViewModel();

  const renderContent = () => {
    if (state.isLoading) return <Loading />;
    if (state.selectedOrderTimeline) {
      return (
        <OrderTimeline
          timelineViewModel={state.selectedOrderTimeline}
          styles={TrackOrderClientStyles}
        />
      );
    }
    if (state.userOrders.length > 0) {
      return (
        <OrderList
          orders={state.userOrders}
          onViewDetails={actions.handleViewOrderDetails}
          styles={TrackOrderClientStyles}
        />
      );
    }
    return (
      <Text style={ClientDefaultStyle.label}>
        Você ainda não possui pedidos para acompanhar.
      </Text>
    );
  };

  return (
    <View style={ClientDefaultStyle.container}>
      <AppHeader
        styleSet={ClientDefaultStyle}
        authStatus={auth.authStatus}
        userName={auth.userName}
        onBackButtonPress={actions.handleBackButtonPress}
        onLeftButtonPress={actions.handleHeaderButtonPress}
      />
      <ScrollView style={ClientDefaultStyle.content}>
        {renderContent()}
      </ScrollView>
    </View>
  );
}
