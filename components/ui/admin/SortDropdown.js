import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { managementStyles as styles } from '../../styles/admin/Management';
import { defaultAdminStyles } from '../../styles/admin/Default';

export const SortDropdown = ({
  columns,
  sortConfig,
  onSortSelect,
  isVisible,
  onToggle,
  currentLabel,
}) => {
  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return (
        <Feather
          name="minus"
          size={16}
          color={defaultAdminStyles.COLORS.lightGray}
        />
      );
    }
    return sortConfig.direction === 'asc' ? (
      <Feather
        name="chevron-up"
        size={18}
        color={defaultAdminStyles.COLORS.primary}
      />
    ) : (
      <Feather
        name="chevron-down"
        size={18}
        color={defaultAdminStyles.COLORS.primary}
      />
    );
  };

  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity
        style={styles.dropdownTrigger}
        onPress={onToggle}
        activeOpacity={0.7}>
        <Text style={styles.dropdownTriggerText}>{currentLabel}</Text>
        <Feather
          name={isVisible ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={defaultAdminStyles.COLORS.primary}
        />
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        transparent
        animationType="fade"
        onRequestClose={onToggle}>
        <TouchableOpacity
          style={styles.dropdownOverlay}
          activeOpacity={1}
          onPress={onToggle}>
          <View style={styles.dropdownMenu}>
            {columns.map((column) => (
              <TouchableOpacity
                key={column.key}
                style={[
                  styles.dropdownMenuItem,
                  sortConfig.key === column.key &&
                    styles.dropdownMenuItemActive,
                ]}
                onPress={() => onSortSelect(column.key)}
                activeOpacity={0.7}>
                <Text
                  style={[
                    styles.dropdownMenuItemText,
                    sortConfig.key === column.key &&
                      styles.dropdownMenuItemTextActive,
                  ]}>
                  {column.label}
                </Text>
                {getSortIcon(column.key)}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};
