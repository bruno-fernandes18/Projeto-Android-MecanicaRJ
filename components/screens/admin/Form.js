import { View, ScrollView, Text } from 'react-native';
import { useAuth } from '../../../context/AuthContext';
import { useAdminFormViewModel } from '../../../models/AdminFormViewModel';
import { defaultAdminStyles } from '../../styles/admin/Default';
import { adminFormStyles as styles } from '../../styles/admin/Form';
import { adminHomeStyles } from '../../styles/admin/Home';
import {
  AppHeader,
  Footer,
  Loading,
  Card,
  Button,
} from '../../ui/admin/Default';
import { FormField } from '../../ui/admin/Form';
export default function AdminFormScreen({ route }) {
  const { mode, id } = route.params;
  const { authStatus } = useAuth();
  const { state, actions } = useAdminFormViewModel(mode, id);
  const renderForm = () => {
    if (state.isLoading) {
      return (
        <Loading
          message={`Carregando ${state.formConfig?.title || 'item'}...`}
        />
      );
    }
    if (state.error && !state.isSaving) {
      return (
        <Card>
          <Text style={styles.errorText}>{state.error}</Text>
        </Card>
      );
    }
    if (state.formSchema.length === 0) {
      return (
        <Card>
          <Text style={styles.errorText}>
            Schema de formulário não encontrado.
          </Text>
        </Card>
      );
    }
    return (
      <Card style={styles.formCard}>
        {state.formSchema.map((field) => (
          <FormField
            key={field.key}
            schema={field}
            value={state.formData[field.key]}
            onChange={(value) => actions.handleFieldChange(field.key, value)}
          />
        ))}
        {state.error && state.isSaving && (
          <Text style={styles.errorText}>{state.error}</Text>
        )}
        <View style={styles.buttonContainer}>
          <Button
            title="Cancelar"
            variant="secondary"
            onPress={actions.handleCancel}
            disabled={state.isSaving}
            style={styles.formButton}
          />
          <Button
            title={state.isSaving ? 'Salvando...' : 'Salvar'}
            variant="primary"
            onPress={actions.handleSave}
            disabled={state.isSaving}
            style={styles.formButton}
          />
        </View>
      </Card>
    );
  };
  return (
    <View style={defaultAdminStyles.container}>
      <AppHeader
        authStatus={authStatus}
        onBackButtonPress={actions.handleCancel}
        styleSet={defaultAdminStyles}
      />
      <ScrollView
        contentContainerStyle={defaultAdminStyles.scrollContentContainer}>
        <View style={defaultAdminStyles.content}>
          <Text style={adminHomeStyles.pageTitle}>
            Editar {state.formConfig?.title || 'Item'}
          </Text>
          {renderForm()}
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}
