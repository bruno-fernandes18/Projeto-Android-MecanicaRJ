import { View, Text } from 'react-native';
import { Button, Card } from './Default';

export const OrderTimeline = ({ timelineViewModel, styles }) => {
  const getPointStyle = (pointType) => {
    switch (pointType) {
      case 'start':
        return styles.dotStart;
      case 'intermediate':
        return styles.dotIntermediate;
      case 'end':
        return styles.dotEnd;
      case 'error':
        return styles.dotError;
      default:
        return styles.dotIntermediate;
    }
  };
  const getLineStyle = (lineType) => {
    switch (lineType) {
      case 'pending':
        return styles.linePending;
      case 'complete':
        return styles.lineComplete;
      case 'gradient':
        return styles.lineGradient;
      case 'none':
        return null;
      default:
        return styles.lineComplete;
    }
  };

  return (
    <View style={styles.timelineContainer}>
      {timelineViewModel.map((item, index) => {
        const lineStyle = getLineStyle(item.lineType);
        const pointStyle = getPointStyle(item.pointType);

        if (item.pointType === 'error') {
          return (
            <Card key={item.id} style={styles.errorItem}>
              <View style={[styles.dot, pointStyle]} />
              <View style={styles.textContainer}>
                <Text style={styles.statusText}>{item.title}</Text>
                <Text style={styles.statusDesc}>{item.description}</Text>
              </View>
            </Card>
          );
        }

        return (
          <Card key={item.id} style={styles.item}>
            {lineStyle && <View style={[styles.line, lineStyle]} />}
            <View style={[styles.dot, pointStyle]} />
            <View style={styles.textContainer}>
              <Text style={styles.statusText}>{item.title}</Text>
              <Text style={styles.statusDesc}>{item.description}</Text>
              <Text style={styles.timestamp}>
                {new Date(item.timestamp).toLocaleString()}
              </Text>
            </View>
          </Card>
        );
      })}
    </View>
  );
};

export const OrderList = ({ orders, onViewDetails, styles }) => (
  <View style={styles.timelineContainer}>
       {' '}
    {orders.map((order) => (
      <Card key={order.id} style={styles.orderItem}>
               {' '}
        <View style={{ flex: 1 }}>
                    <Text style={styles.statusText}>Pedido #{order.id}</Text>   
               {' '}
          <Text style={styles.statusDesc}>
            Status: {order.currentStatus || 'Pendente'}
          </Text>
                   {' '}
          <Text style={styles.timestamp}>
            Criado em: {new Date(order.createdAt).toLocaleDateString()}
          </Text>
                 {' '}
        </View>
        <Button
          title="Consultar"
          onPress={() => onViewDetails(order.id)}
          style={{ marginLeft: 12 }}
        />
             {' '}
      </Card>
    ))}
     {' '}
  </View>
);
