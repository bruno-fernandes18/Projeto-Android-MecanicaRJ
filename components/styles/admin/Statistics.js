import { StyleSheet } from 'react-native';
import { defaultAdminStyles } from './Default';

const COLORS = defaultAdminStyles.COLORS;
const FONTS = defaultAdminStyles.FONTS;

export const statisticsStyles = StyleSheet.create({
  errorText: {
    fontSize: 16,
    color: COLORS.error,
    fontFamily: FONTS.body,
    textAlign: 'center',
    paddingVertical: 20,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  statCard: {
    width: '48%',
    minHeight: 150,
    marginBottom: 15,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: COLORS.white,
    borderColor: COLORS.gold,
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  statTitle: {
    fontSize: 16,
    fontFamily: FONTS.title,
    color: COLORS.primary,
    marginBottom: 10,
  },
  statValue: {
    fontSize: 40,
    fontFamily: FONTS.title,
    color: COLORS.darkRed,
    fontWeight: 'bold',
    textAlign: 'right',
    alignSelf: 'flex-end',
  },
  statText: {
    fontSize: 16,
    fontFamily: FONTS.body,
    color: COLORS.text,
    alignSelf: 'flex-end',
  },

  chartCard: {
    width: '100%',
    minHeight: 250,
    marginBottom: 15,
  },

  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    marginBottom: 5,
  },
  legendColorBox: {
    width: 14,
    height: 14,
    borderRadius: 3,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    fontFamily: FONTS.body,
    color: COLORS.text,
  },
});
