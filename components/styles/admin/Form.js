import { StyleSheet, Platform } from 'react-native';
import { defaultAdminStyles } from './Default';

const COLORS = defaultAdminStyles.COLORS;
const FONTS = defaultAdminStyles.FONTS;

export const adminFormStyles = StyleSheet.create({
  formCard: {
    padding: 16,
  },
  errorText: {
    fontSize: 16,
    color: COLORS.error,
    fontFamily: FONTS.body,
    textAlign: 'center',
    marginBottom: 15,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 16,
    color: COLORS.text,
    fontFamily: FONTS.title,
    fontWeight: '600',
    marginBottom: 8,
  },
  inputReadOnly: {
    backgroundColor: '#f8f9fa',
    opacity: 0.7,
  },
  textarea: {
    height: 120,
    textAlignVertical: 'top',
    paddingTop: 15,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 4,
    marginBottom: 10,
  },

  pickerWrapper: {
    display: 'none',
  },
  picker: {
    display: 'none',
  },

  roleButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  roleButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gold,
    alignItems: 'center',
    marginHorizontal: 4,
    borderRadius: 6,
  },
  roleButtonSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.darkRed,
  },
  roleButtonText: {
    fontSize: 14,
    fontFamily: FONTS.body,
    color: COLORS.text,
    fontWeight: '500',
  },
  roleButtonTextSelected: {
    color: COLORS.white,
    fontWeight: 'bold',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.gold,
    paddingTop: 15,
  },
  formButton: {
    flex: 0.48,
  },
});
