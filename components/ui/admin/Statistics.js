import { View, Text } from 'react-native';
import { statisticsStyles as styles } from '../../styles/admin/Statistics';

export const PieChartLegend = ({ data }) => (
  <View style={styles.legendContainer}>
    {data.map((item) => (
      <View key={item.label} style={styles.legendItem}>
        <View
          style={[styles.legendColorBox, { backgroundColor: item.color }]}
        />
        <Text style={styles.legendText}>
          {item.label} ({item.value})
        </Text>
      </View>
    ))}
  </View>
);

export const StatCard = ({ title, value, subtext }) => (
  <View style={styles.statCard}>
    <Text style={styles.statTitle}>{title}</Text>
    {value != null && <Text style={styles.statValue}>{value}</Text>}
    {subtext && <Text style={styles.statText}>{subtext}</Text>}
  </View>
);
