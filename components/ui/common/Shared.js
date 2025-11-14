import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

export const Button = ({
  styleSet,
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
  textStyle,
  ...rest
}) => {
  const STYLES = styleSet;
  if (!STYLES) return <Text>Error: styleSet not provided for Button</Text>;
  const buttonStyle =
    variant === 'primary' ? STYLES.buttonPrimary : STYLES.buttonSecondary;
  const textStyleDefault =
    variant === 'primary'
      ? STYLES.buttonTextPrimary
      : STYLES.buttonTextSecondary;

  return (
    <TouchableOpacity
      style={[
        STYLES.button,
        buttonStyle,
        style,
        disabled && STYLES.buttonDisabled,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      {...rest}>
      <Text style={[textStyleDefault, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export const Loading = ({ styleSet, message = 'Carregando...' }) => {
  const STYLES = styleSet;
  if (!STYLES) return <Text>Error: styleSet not provided for Loading</Text>;
  const COLORS = STYLES.COLORS;

  return (
    <View style={STYLES.loadingContainer}>
      <ActivityIndicator size="large" color={COLORS.primary} />
      <Text style={STYLES.loadingText}>{message}</Text>
    </View>
  );
};

export const Input = ({
  styleSet,
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  style,
  ...rest
}) => {
  const STYLES = styleSet;
  if (!STYLES) return <Text>Error: styleSet not provided for Input</Text>;
  const COLORS = STYLES.COLORS;

  return (
    <View style={STYLES.inputContainer}>
      {label && <Text style={STYLES.label}>{label}</Text>}
      <TextInput
        style={[STYLES.input, style]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        placeholderTextColor={COLORS.lightGray}
        {...rest}
      />
    </View>
  );
};

export const Card = ({ styleSet, children, style }) => {
  const STYLES = styleSet;
  if (!STYLES) return <Text>Error: styleSet not provided for Card</Text>;
  return <View style={[STYLES.card, style]}>{children}</View>;
};

export const Footer = ({ styleSet, text }) => {
  const STYLES = styleSet;
  if (!STYLES) return <Text>Error: styleSet not provided for Footer</Text>;
  return (
    <View style={STYLES.footer}>
      {' '}
      <Text style={STYLES.footerText}>{text}</Text>
    </View>
  );
};

export const AppHeader = ({
  styleSet,
  authStatus = 'unauthenticated',
  isLoginView = true,
  onLeftButtonPress,
  onBackButtonPress,
}) => {
  const STYLES = styleSet;
  if (!STYLES) return <Text>Error: styleSet not provided for AppHeader</Text>;
  const COLORS = STYLES.COLORS;

  const renderLeftButton = () => {
    if (onBackButtonPress) {
      return (
        <TouchableOpacity onPress={onBackButtonPress} style={STYLES.headerIcon}>
          <Feather
            name="chevron-left"
            size={26}
            color={COLORS.primaryText || COLORS.white}
          />
        </TouchableOpacity>
      );
    }

    let leftButtonText = '';
    if (authStatus === 'unauthenticated') {
      leftButtonText = isLoginView ? 'Register' : 'Login';
    } else if (authStatus === 'authenticated') {
      leftButtonText = 'Logout';
    } else if (authStatus === 'guest') {
      leftButtonText = 'Login';
    }
    if (authStatus === 'authenticated' && !leftButtonText) {
      leftButtonText = 'Logout';
    }

    return (
      <TouchableOpacity onPress={onLeftButtonPress}>
        <Text style={STYLES.headerButtonText}>{leftButtonText}</Text>
      </TouchableOpacity>
    );
  };

  const logoMechanicsColor = COLORS.primaryText || COLORS.white;
  const logoRJColor = COLORS.accentRed || COLORS.accentBlue;

  return (
    <View
      style={[
        STYLES.headerContainer,
        { backgroundColor: COLORS.primary || COLORS.darkRed },
      ]}>
      <View style={STYLES.headerLeft}>{renderLeftButton()}</View>
      <View style={STYLES.headerLogoContainer}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[STYLES.logoMechanics, { color: logoMechanicsColor }]}>
            Mecânica
          </Text>
          <Text style={[STYLES.logoRJ, { color: logoRJColor }]}>RJ</Text>
        </View>
      </View>
    </View>
  );
};
