import { View, Text, Switch, TouchableOpacity } from 'react-native';
import { Input } from './Default';
import { adminFormStyles as styles } from '../../styles/admin/Form';
import { defaultAdminStyles } from '../../styles/admin/Default';

const COLORS = defaultAdminStyles.COLORS;

export const FormField = ({ schema, value, onChange }) => {
  const { type, label, readOnly, options, key } = schema;

  const renderField = () => {
    switch (type) {
      case 'text':
      case 'textarea':
        return (
          <Input
            label={label}
            value={value || ''}
            onChangeText={onChange}
            editable={!readOnly}
            style={[
              type === 'textarea' ? styles.textarea : null,
              readOnly ? styles.inputReadOnly : null,
            ]}
            multiline={type === 'textarea'}
          />
        );

      case 'switch':
        return (
          <View style={styles.switchContainer}>
            <Text style={styles.fieldLabel}>{label}</Text>
            <Switch
              value={value || false}
              onValueChange={onChange}
              trackColor={{ false: COLORS.lightGray, true: COLORS.primary }}
              thumbColor={COLORS.white}
              disabled={readOnly}
            />
          </View>
        );

      case 'select': {
        if (key === 'role') {
          const roleOptions = [
            { label: 'Admin', value: 'admin' },
            { label: 'Moderator', value: 'moderator' },
            { label: 'Client', value: 'client' },
          ];

          return (
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>{label}</Text>
              <View style={styles.roleButtonContainer}>
                {roleOptions.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.roleButton,
                      value === option.value && styles.roleButtonSelected,
                    ]}
                    onPress={() => onChange(option.value)}
                    disabled={readOnly}>
                    <Text
                      style={[
                        styles.roleButtonText,
                        value === option.value && styles.roleButtonTextSelected,
                      ]}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          );
        }
        return (
          <Input
            label={label}
            value={value || ''}
            onChangeText={onChange}
            editable={!readOnly}
            style={readOnly ? styles.inputReadOnly : null}
            placeholder="Digite o status..."
          />
        );
      }

      default:
        return (
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>{label}</Text>
            <Text style={styles.errorText}>
              Tipo de campo desconhecido: {type}
            </Text>
          </View>
        );
    }
  };

  return <View key={key}>{renderField()}</View>;
};
