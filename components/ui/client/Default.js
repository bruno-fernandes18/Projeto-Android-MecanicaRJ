import { ClientDefaultStyle } from '../../styles/client/Default';
import {
  Button as SharedButton,
  Loading as SharedLoading,
  Input as SharedInput,
  AppHeader as SharedAppHeader,
  Card as SharedCard,
  Footer as SharedFooter,
} from '../common/Shared';

export const Button = (props) => (
  <SharedButton styleSet={ClientDefaultStyle} {...props} />
);
export const Loading = (props) => (
  <SharedLoading styleSet={ClientDefaultStyle} {...props} />
);
export const Input = (props) => (
  <SharedInput styleSet={ClientDefaultStyle} {...props} />
);
export const AppHeader = (props) => (
  <SharedAppHeader styleSet={ClientDefaultStyle} {...props} />
);
export const Card = (props) => (
  <SharedCard styleSet={ClientDefaultStyle} {...props} />
);
export const Footer = () => (
  <SharedFooter
    styleSet={ClientDefaultStyle}
    text="© 2025 Mecânica RJ. Todos os direitos reservados."
  />
);
