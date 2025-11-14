import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { managementStyles as styles } from '../../styles/admin/Management';
import { defaultAdminStyles } from '../../styles/admin/Default';

export const SortableTable = ({
  columns,
  data,
  sortConfig,
  onSort,
  renderRowActions,
}) => {
  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return (
        <Feather
          name="minus"
          size={14}
          color={defaultAdminStyles.COLORS.gold}
        />
      );
    }
    if (sortConfig.direction === 'asc') {
      return (
        <Feather
          name="chevron-up"
          size={18}
          color={defaultAdminStyles.COLORS.white}
        />
      );
    }
    return (
      <Feather
        name="chevron-down"
        size={18}
        color={defaultAdminStyles.COLORS.white}
      />
    );
  };
  const actionColWidth = columns.actionColumnWidth || 90;

  const TableHeader = () => (
    <View style={styles.tableHeader}>
      <View style={[styles.headerCell, { width: actionColWidth }]}>
        <Text style={styles.headerCellText}>Ação</Text>
      </View>
      {columns.map((col) => {
        const headerCellStyles = [styles.headerCell, { width: col.width }];
        if (col.sortable) {
          headerCellStyles.push(styles.headerCellSortable);
        }
        return (
          <TouchableOpacity
            key={col.key}
            style={headerCellStyles}
            onPress={() => col.sortable && onSort(col.key)}
            disabled={!col.sortable}>
            <Text style={styles.headerCellText}>{col.label}</Text>
            {col.sortable && renderSortIcon(col.key)}
          </TouchableOpacity>
        );
      })}
    </View>
  );
  const TableRow = ({ item, index }) => (
    <View
      style={[styles.tableRow, index % 2 !== 0 ? styles.tableRowOdd : null]}>
      <View
        style={[styles.cell, { width: actionColWidth, alignItems: 'center' }]}>
        {renderRowActions(item)}
      </View>
      {columns.map((col) => (
        <View key={col.key} style={[styles.cell, { width: col.width }]}>
          <Text style={styles.cellText}>
            {col.render ? col.render(item[col.key]) : item[col.key]}
          </Text>
        </View>
      ))}
    </View>
  );

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={true}
      nestedScrollEnabled={true}>
      <View style={styles.tableWrapper}>
        <TableHeader />
        {data.map((item, index) => (
          <TableRow key={item.id} item={item} index={index} />
        ))}
      </View>
    </ScrollView>
  );
};
