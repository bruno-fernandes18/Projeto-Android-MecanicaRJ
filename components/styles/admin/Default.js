import { StyleSheet, Platform, StatusBar } from 'react-native';

const COLORS = {
  primary: '#A91101',
  secondary: '#FDF5E6',
  darkRed: '#8B0000',
  gold: '#DAA520',
  accentBlue: '#0A3D62',
  text: '#222222',
  white: '#FFFFFF',
  lightGray: '#A9A9A9',
  error: '#E11',
};

const FONTS = {
  title: Platform.OS === 'ios' ? 'Palatino' : 'serif',
  body: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
};

export const defaultAdminStyles = StyleSheet.create({
  COLORS: COLORS,
  FONTS: FONTS,

  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollContentContainer: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.gold,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 6,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.gold,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    fontFamily: FONTS.body,
    color: COLORS.text,
    backgroundColor: COLORS.white,
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: COLORS.text,
    fontFamily: FONTS.title,
    marginBottom: 8,
  },

  button: {
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    marginVertical: 8,
    borderWidth: 1,
  },
  buttonPrimary: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.gold,
  },
  buttonSecondary: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.primary,
  },
  buttonTextPrimary: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
    fontFamily: FONTS.title,
  },
  buttonTextSecondary: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    fontFamily: FONTS.title,
  },
  buttonDisabled: {
    opacity: 0.6,
    elevation: 0,
  },

  headerContainer: {
    paddingTop: Platform.OS === 'android' ? 10 : 40,
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: COLORS.darkRed,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.gold,
  },
  headerLeft: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  headerLogoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  headerButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: FONTS.body,
    fontWeight: '500',
  },
  headerIcon: {
    padding: 5,
  },
  logoMechanics: {
    fontSize: 22,
    fontFamily: FONTS.title,
    color: COLORS.white,
    fontWeight: 'bold',
  },
  logoRJ: {
    fontSize: 22,
    fontFamily: FONTS.title,
    color: COLORS.accentBlue,
    fontWeight: 'bold',
    marginLeft: 4,
  },

  footer: {
    backgroundColor: COLORS.darkRed,
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderTopWidth: 2,
    borderTopColor: COLORS.gold,
  },
  footerText: {
    fontSize: 12,
    color: COLORS.white,
    textAlign: 'center',
    fontFamily: FONTS.body,
    opacity: 0.8,
  },

  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    backgroundColor: COLORS.secondary,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: COLORS.text,
    fontFamily: FONTS.body,
  },
});
