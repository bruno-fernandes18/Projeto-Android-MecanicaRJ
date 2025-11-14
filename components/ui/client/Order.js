import { View, Text, TouchableOpacity, TextInput, Switch } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ClientDefaultStyle } from '../../styles/client/Default';
import { ORDER_DESCRIPTION_MAX_LENGTH } from '../../../models/OrderModel';
import { Button } from './Default';
import { OrderClientStyles } from '../../styles/client/Order';

const STYLES = ClientDefaultStyle;

export const OptionButton = ({ title, onPress, isSelected }) => (
  <TouchableOpacity
    style={[
      OrderClientStyles.optionButton,
      isSelected && OrderClientStyles.optionButtonSelected,
    ]}
    onPress={onPress}>
    <Text
      style={[
        STYLES.buttonTextSecondary,
        isSelected && OrderClientStyles.optionTextSelected,
      ]}>
      {title}
    </Text>
  </TouchableOpacity>
);

export const ProblemToggle = ({ label, value, onValueChange }) => (
  <View style={OrderClientStyles.toggleContainer}>
    <Text style={OrderClientStyles.toggleLabel}>{label}</Text>
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: STYLES.COLORS.border, true: STYLES.COLORS.primary }}
      thumbColor={STYLES.COLORS.white}
    />
  </View>
);

export const NavigationArrows = ({ onNext, onPrev, isFirst, isLast }) => (
  <View style={OrderClientStyles.navContainer}>
    <TouchableOpacity
      style={[OrderClientStyles.navButton, { opacity: isFirst ? 0.3 : 1 }]}
      onPress={onPrev}
      disabled={isFirst}>
      <Feather name="arrow-left" size={30} color={STYLES.COLORS.primary} />
    </TouchableOpacity>

    {!isLast && (
      <TouchableOpacity style={OrderClientStyles.navButton} onPress={onNext}>
        <Feather name="arrow-right" size={30} color={STYLES.COLORS.primary} />
      </TouchableOpacity>
    )}
  </View>
);

export const SectionIntro = ({ style }) => (
  <View style={[OrderClientStyles.sectionContainer, style]}>
    <Text style={OrderClientStyles.title}>Agendamento de Consulta</Text>
    <Text style={OrderClientStyles.subtitle}>
      Vamos começar! Para entendermos melhor o que seu veículo precisa,
      preparamos um rápido formulário. Suas respostas nos ajudarão a preparar um
      orçamento e agilizar seu atendimento.
    </Text>
  </View>
);

export const SectionWashCheck = ({ style, draft, onUpdate }) => (
  <View style={[OrderClientStyles.sectionContainer, style]}>
    <Text style={OrderClientStyles.title}>1. Lavagem</Text>
    <Text style={OrderClientStyles.subtitle}>
      Seu serviço inclui lavagem, polimento ou alguma outra necessidade
      estética?
    </Text>
    <OptionButton
      title="Sim, inclui lavagem"
      isSelected={draft.is_wash === true}
      onPress={() => onUpdate('is_wash', true)}
    />
    <OptionButton
      title="Não, é outro problema"
      isSelected={draft.is_wash === false}
      onPress={() => onUpdate('is_wash', false)}
    />
  </View>
);

export const SectionOnlyWashCheck = ({ style, draft, onUpdate }) => (
  <View style={[OrderClientStyles.sectionContainer, style]}>
    <Text style={OrderClientStyles.title}>1.1. Apenas Lavagem</Text>
    <Text style={OrderClientStyles.subtitle}>
      O serviço que você procura é APENAS a lavagem/estética, ou ela é um
      adicional a outro problema mecânico?
    </Text>
    <OptionButton
      title="É SÓ lavagem"
      isSelected={draft.is_only_wash === true}
      onPress={() => onUpdate('is_only_wash', true)}
    />
    <OptionButton
      title="É lavagem e outro serviço"
      isSelected={draft.is_only_wash === false}
      onPress={() => onUpdate('is_only_wash', false)}
    />
  </View>
);

export const SectionProblemsCore = ({ style, draft, onUpdate }) => (
  <View style={[OrderClientStyles.sectionContainer, style]}>
    <Text style={OrderClientStyles.title}>2. Problemas (Núcleo)</Text>
    <Text style={OrderClientStyles.subtitle}>
      Selecione os problemas relacionados ao coração do veículo.
    </Text>
    <ProblemToggle
      label="Motor"
      value={draft.problems_engine}
      onValueChange={(v) => onUpdate('problems_engine', v)}
    />
    <ProblemToggle
      label="Elétrica"
      value={draft.problems_electric}
      onValueChange={(v) => onUpdate('problems_electric', v)}
    />
    <ProblemToggle
      label="Fluidos"
      value={draft.problems_fluids}
      onValueChange={(v) => onUpdate('problems_fluids', v)}
    />
  </View>
);

export const SectionProblemsChassis = ({ style, draft, onUpdate }) => (
  <View style={[OrderClientStyles.sectionContainer, style]}>
    <Text style={OrderClientStyles.title}>3. Problemas (Chassi)</Text>
    <Text style={OrderClientStyles.subtitle}>
      Agora, vamos checar os itens de rodagem e segurança.
    </Text>
    <ProblemToggle
      label="Freios"
      value={draft.problems_brake}
      onValueChange={(v) => onUpdate('problems_brake', v)}
    />
    <ProblemToggle
      label="Pneus ou Suspensão"
      value={draft.problems_tire}
      onValueChange={(v) => onUpdate('problems_tire', v)}
    />
  </View>
);

export const SectionDescription = ({
  style,
  draft,
  onChange,
  count,
  isError,
}) => (
  <View style={[OrderClientStyles.sectionContainer, style]}>
    <Text style={OrderClientStyles.title}>4. Descrição</Text>
    <Text style={OrderClientStyles.subtitle}>
      Por favor, descreva com mais detalhes o que está acontecendo. Quanto mais
      informação, melhor nosso diagnóstico.
    </Text>
    <TextInput
      style={OrderClientStyles.textArea}
      placeholder="Ex: Meu carro está fazendo barulho na roda dianteira direita..."
      value={draft.description}
      onChangeText={onChange}
      multiline
      maxLength={ORDER_DESCRIPTION_MAX_LENGTH + 20}
    />
    <Text
      style={[
        OrderClientStyles.charCounter,
        isError && OrderClientStyles.charCounterError,
      ]}>
      {count}
    </Text>
  </View>
);

export const SectionCart = ({
  style,
  draft,
  onSubmit,
  onCancel,
  estimatedBudget,
}) => {
  return (
    <View style={[OrderClientStyles.sectionContainer, style]}>
      <Text style={OrderClientStyles.title}>5. Resumo da Consulta</Text>
      <Text style={OrderClientStyles.subtitle}>
        Confira os dados da sua solicitação. Esta é uma estimativa e o valor
        final será confirmado após a análise presencial.
      </Text>
      <View style={OrderClientStyles.cartSummary}>
        <Text style={OrderClientStyles.summaryTitle}>Itens Solicitados:</Text>
        {draft.isOnlyWash && (
          <Text style={OrderClientStyles.summaryItem}>- Apenas Lavagem</Text>
        )}
        {!draft.isOnlyWash && draft.isWash && (
          <Text style={OrderClientStyles.summaryItem}>- Lavagem Adicional</Text>
        )}
        {draft.problems_engine && (
          <Text style={OrderClientStyles.summaryItem}>- Análise de Motor</Text>
        )}
        {draft.problems_electric && (
          <Text style={OrderClientStyles.summaryItem}>- Análise Elétrica</Text>
        )}
        {draft.problems_fluids && (
          <Text style={OrderClientStyles.summaryItem}>
            - Análise de Fluidos
          </Text>
        )}
        {draft.problems_brake && (
          <Text style={OrderClientStyles.summaryItem}>- Análise de Freios</Text>
        )}
        {draft.problems_tire && (
          <Text style={OrderClientStyles.summaryItem}>
            - Análise de Pneus/Suspensão
          </Text>
        )}
        <Text style={[OrderClientStyles.summaryTitle, { marginTop: 20 }]}>
          Orçamento Estimado:
        </Text>
        <Text style={OrderClientStyles.summaryItem}>{estimatedBudget}</Text>
      </View>

      <View style={OrderClientStyles.cartButtonContainer}>
        <Button
          title="Cancelar"
          variant="secondary"
          onPress={onCancel}
          style={{ flex: 0.48 }}
        />
        <Button
          title="Marcar Consulta"
          variant="primary"
          onPress={onSubmit}
          style={{ flex: 0.48 }}
        />
      </View>
    </View>
  );
};
