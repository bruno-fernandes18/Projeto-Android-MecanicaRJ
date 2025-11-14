import { StyleSheet } from 'react-native';
import { defaultAdminStyles } from './Default';

const COLORS = defaultAdminStyles.COLORS;
const FONTS = defaultAdminStyles.FONTS;

export const adminHomeStyles = StyleSheet.create({
  pageTitle: {
    fontSize: 32,
    fontFamily: FONTS.title,
    color: COLORS.text,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pageSubtitle: {
    fontSize: 18,
    fontFamily: FONTS.body,
    color: COLORS.text,
    marginBottom: 30,
  },
  menuContainer: {
    width: '100%',
  },
  menuButton: {
    marginVertical: 10,
  },
});
