import { StyleSheet } from 'react-native';
import { ClientDefaultStyle } from './Default';

const STYLES = ClientDefaultStyle;

export const AboutClientStyles = StyleSheet.create({
  title: {
    ...STYLES.pageTitle,
    textAlign: 'left',
    marginBottom: 20,
    marginTop: 15,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: STYLES.COLORS.primary,
    fontFamily: STYLES.FONTS.title,
    marginBottom: 10,
    marginTop: 15,
  },
  paragraph: {
    fontSize: 16,
    color: STYLES.COLORS.secondaryText,
    fontFamily: STYLES.FONTS.body,
    lineHeight: 24,
    marginBottom: 15,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: STYLES.COLORS.border,
  },
  caption: {
    fontSize: 12,
    color: STYLES.COLORS.secondaryText,
    fontFamily: STYLES.FONTS.body,
    textAlign: 'center',
    marginBottom: 20,
  },
});
