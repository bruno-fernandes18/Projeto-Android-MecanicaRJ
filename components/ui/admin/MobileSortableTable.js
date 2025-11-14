import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { managementStyles as styles } from '../../styles/admin/Management';
import { defaultAdminStyles } from '../../styles/admin/Default';
import { Card } from './Default';
import { SortDropdown } from './SortDropdown';

export const MobileSortableTable = ({
  columns,
  data,
  sortConfig,
  onSort,
  renderRowActions,
}) => {
  const [showSortMenu, setShowSortMenu] = useState(false);

  const sortableColumns = columns.filter((col) => col.sortable);

  const getCurrentSortLabel = () => {
    const currentColumn = columns.find((col) => col.key === sortConfig.key);
    return currentColumn ? currentColumn.label : 'Selecionar';
  };

  const handleSortSelect = (key) => {
    onSort(key);
    setShowSortMenu(false);
  };

  const renderCard = (item, index) => {
    return (
      <Card
        key={item.id}
        styleSet={defaultAdminStyles}
        style={styles.mobileCard}>
        <View style={styles.mobileCardHeader}>
          <Text style={styles.mobileCardTitle}>ID: {item.id}</Text>
          <View style={styles.mobileCardActions}>{renderRowActions(item)}</View>
        </View>

        <View style={styles.mobileCardContent}>
          {columns
            .filter((col) => col.key !== 'id')
            .map((col) => (
              <View key={col.key} style={styles.mobileCardRow}>
                <Text style={styles.mobileCardLabel}>{col.label}:</Text>
                <Text style={styles.mobileCardValue}>
                  {col.render
                    ? col.render(item[col.key])
                    : item[col.key] || 'N/A'}
                </Text>
              </View>
            ))}
        </View>

        <View style={styles.mobileCardFooter}>
          <Text style={styles.mobileCardTimestamp}>
            Última atualização:{' '}
            {item.updated_at
              ? new Date(item.updated_at).toLocaleDateString('pt-BR')
              : 'N/A'}
          </Text>
        </View>
      </Card>
    );
  };

  return (
    <View style={styles.mobileTableContainer}>
      <View style={styles.sortHeader}>
        <Text style={styles.sortLabel}>Ordenar por:</Text>
        <SortDropdown
          columns={sortableColumns}
          sortConfig={sortConfig}
          onSortSelect={handleSortSelect}
          isVisible={showSortMenu}
          onToggle={() => setShowSortMenu(!showSortMenu)}
          currentLabel={getCurrentSortLabel()}
        />
      </View>
      <ScrollView
        style={styles.mobileScrollView}
        showsVerticalScrollIndicator={false}>
        {data.map((item, index) => renderCard(item, index))}
        {data.length === 0 && (
          <Card styleSet={defaultAdminStyles} style={styles.emptyCard}>
            <Text style={styles.emptyText}>Nenhum item encontrado</Text>
          </Card>
        )}
      </ScrollView>
    </View>
  );
};
