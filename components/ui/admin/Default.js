import { defaultAdminStyles } from '../../styles/admin/Default';
import {
  Button as SharedButton,
  Loading as SharedLoading,
  Input as SharedInput,
  AppHeader as SharedAppHeader,
  Card as SharedCard,
  Footer as SharedFooter,
} from '../common/Shared';

export const Button = (props) => (
  <SharedButton styleSet={defaultAdminStyles} {...props} />
);
export const Loading = (props) => (
  <SharedLoading styleSet={defaultAdminStyles} {...props} />
);
export const Input = (props) => (
  <SharedInput styleSet={defaultAdminStyles} {...props} />
);
export const AppHeader = (props) => (
  <SharedAppHeader styleSet={defaultAdminStyles} {...props} />
);
export const Card = (props) => (
  <SharedCard styleSet={defaultAdminStyles} {...props} />
);
export const Footer = () => (
  <SharedFooter
    styleSet={defaultAdminStyles}
    text="© 2025 Mecânica RJ | Painel Administrativo"
  />
);
