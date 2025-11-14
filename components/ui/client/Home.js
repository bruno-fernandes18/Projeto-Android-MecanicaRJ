import { View, Text } from 'react-native';
import { Button, Input } from './Default';
import { homeClientStyles } from '../../styles/client/Home';
import { ClientDefaultStyle } from '../../styles/client/Default';

export const PageTitle = ({ title }) => (
  <Text style={ClientDefaultStyle.pageTitle}>{title}</Text>
);
export const LoginForm = ({
  username,
  password,
  email,
  isLoginView,
  onUsernameChange,
  onPasswordChange,
  onEmailChange,
}) => (
  <View style={ClientDefaultStyle.formContainer}>
    {!isLoginView && (
      <Input
        label="Email"
        value={email}
        onChangeText={onEmailChange}
        placeholder="Enter your Email"
        keyboardType="email-address"
      />
    )}
    <Input
      label={isLoginView ? 'Email' : 'Nome de Usuário'}
      value={isLoginView ? email : username}
      onChangeText={isLoginView ? onEmailChange : onUsernameChange}
      placeholder={
        isLoginView ? 'Digite seu Email' : 'Digite seu Nome de Usuário'
      }
      keyboardType={isLoginView ? 'email-address' : 'default'}
    />
    <Input
      label="Password"
      value={password}
      onChangeText={onPasswordChange}
      placeholder="••••••••"
      secureTextEntry
    />
  </View>
);
export const MenuButton = ({ title, variant, onPress, disabled }) => (
  <Button
    title={title}
    onPress={onPress}
    variant={variant}
    disabled={disabled}
    style={homeClientStyles.menuButton}
  />
);
