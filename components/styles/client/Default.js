import { StyleSheet, Platform, StatusBar } from 'react-native';

const COLORS = {
  primary: '#0A3D62',
  secondary: '#F1F3F6',
  text: '#222222',
  secondaryText: '#555555',
  white: '#FFFFFF',
  border: '#E0E0E0',
  lightGray: '#A9A9A9',
  darkBlue: '#082f49',
  error: '#E11',
  accentRed: '#D62828',
  primaryText: '#FFFFFF',
  darkText: '#222222',
};

const FONTS = {
  title: Platform.OS === 'ios' ? 'HelveticaNeue-Bold' : 'sans-serif-medium',
  body: Platform.OS === 'ios' ? 'HelveticaNeue' : 'sans-serif',
  logo: Platform.OS === 'ios' ? 'Georgia-Bold' : 'serif',
};

export const ClientDefaultStyle = StyleSheet.create({
  COLORS: COLORS,
  FONTS: FONTS,

  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  scrollContentContainer: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  content: {
    paddingHorizontal: 20,
  },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
  },
  label: {
    fontSize: 15,
    color: COLORS.darkText,
    marginBottom: 10,
    fontFamily: FONTS.body,
    fontWeight: '500',
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    minHeight: 50,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    fontFamily: FONTS.body,
    color: COLORS.text,
    backgroundColor: COLORS.white,
  },

  button: {
    minHeight: 50,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
    marginTop: 10,
  },
  buttonPrimary: {
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
  },
  buttonSecondary: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowOpacity: 0.05,
  },
  buttonTextPrimary: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.white,
    fontFamily: FONTS.body,
  },
  buttonTextSecondary: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.primary,
    fontFamily: FONTS.body,
  },
  buttonDisabled: {
    opacity: 0.5,
    elevation: 0,
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

  footer: {
    backgroundColor: COLORS.primary,
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.darkBlue,
  },
  footerText: {
    fontSize: 12,
    color: COLORS.white,
    textAlign: 'center',
    fontFamily: FONTS.body,
    opacity: 0.8,
  },

  headerContainer: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.darkBlue,
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
    color: COLORS.primaryText,
    fontSize: 16,
    fontFamily: FONTS.body,
    fontWeight: '500',
  },
  headerIcon: {
    padding: 5,
  },
  logoMechanics: {
    fontSize: 22,
    fontFamily: FONTS.logo,
    color: COLORS.primaryText,
    fontWeight: 'bold',
  },
  logoRJ: {
    fontSize: 22,
    fontFamily: FONTS.logo,
    color: COLORS.accentRed,
    fontWeight: 'bold',
    marginLeft: 4,
  },

  pageTitle: {
    fontSize: 32,
    color: COLORS.darkText,
    fontFamily: FONTS.title,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 25,
  },
});
