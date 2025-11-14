import { StyleSheet } from 'react-native';
import { ClientDefaultStyle } from './Default';

const STYLES = ClientDefaultStyle;

export const OrderClientStyles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 12,
    backgroundColor: STYLES.COLORS.secondary,
  },
  title: {
    ...STYLES.pageTitle,
    marginTop: 0,
    fontSize: 28,
    textAlign: 'left',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: STYLES.COLORS.secondaryText,
    fontFamily: STYLES.FONTS.body,
    lineHeight: 24,
    marginBottom: 30,
  },
  optionButton: {
    ...STYLES.button,
    ...STYLES.buttonSecondary,
    backgroundColor: STYLES.COLORS.white,
    marginBottom: 15,
  },
  optionButtonSelected: {
    backgroundColor: STYLES.COLORS.primary,
    borderColor: STYLES.COLORS.darkBlue,
  },
  optionTextSelected: {
    color: STYLES.COLORS.white,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: STYLES.COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: STYLES.input.borderRadius,
    borderWidth: 1,
    borderColor: STYLES.input.borderColor,
    marginBottom: 12,
  },
  toggleLabel: {
    fontSize: 16,
    fontFamily: STYLES.FONTS.body,
    color: STYLES.COLORS.text,
    fontWeight: '500',
  },
  textArea: {
    ...STYLES.input,
    height: 150,
    textAlignVertical: 'top',
    paddingTop: 15,
  },
  charCounter: {
    textAlign: 'right',
    color: STYLES.COLORS.lightGray,
    marginTop: 5,
    fontSize: 12,
  },
  charCounterError: {
    color: STYLES.COLORS.accentRed,
    fontWeight: 'bold',
  },
  navContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navButton: {
    padding: 10,
    backgroundColor: STYLES.COLORS.white,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: STYLES.COLORS.border,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cartSummary: {
    ...STYLES.card,
    padding: 20,
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: STYLES.COLORS.primary,
    marginBottom: 15,
  },
  summaryItem: {
    fontSize: 16,
    color: STYLES.COLORS.text,
    marginBottom: 8,
  },
  cartButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  swiperContainer: {
    flex: 1,
    position: 'relative',
  },
  scrollView: {
    flex: 1,
  },
});
