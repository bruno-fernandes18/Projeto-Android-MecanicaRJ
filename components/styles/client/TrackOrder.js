import { StyleSheet } from 'react-native';
import { ClientDefaultStyle } from './Default';

const COLORS = ClientDefaultStyle.COLORS;
const FONTS = ClientDefaultStyle.FONTS;

export const TrackOrderClientStyles = StyleSheet.create({
  orderItem           : {
    padding           : 16,
    flexDirection     : 'row',
    justifyContent    : 'space-between',
    alignItems        : 'center',
    backgroundColor   : COLORS.white,
    marginBottom      : 12,
    borderRadius      : 8,
  },

  timelineContainer   : {
    padding           : 20,
  },
  item                : {
    flexDirection     : 'row',
    alignItems        : 'flex-start',
    minHeight         : 60,
    position          : 'relative',
    marginBottom      : 0,
    borderWidth       : 0,
    shadowOpacity     : 0,
    elevation         : 0,
    padding           : 0,
    backgroundColor   : 'transparent',
  },
  textContainer       : {
    flex              : 1,
    paddingBottom     : 16,
    paddingLeft       : 10,
  },
  statusText          : {
    fontSize          : 16,
    fontWeight        : 'bold',
    color             : COLORS.text,
    fontFamily        : FONTS.body,
  },
  statusDesc          : {
    fontSize          : 14,
    color             : COLORS.secondaryText,
    fontFamily        : FONTS.body,
    marginTop         : 4,
  },
  timestamp           : {
    fontSize          : 12,
    color             : COLORS.lightGray,
    marginTop         : 6,
  },

  dot                 : {
    width             : 16,
    height            : 16,
    borderRadius      : 8,
    zIndex            : 1,
    marginRight       : 12,
    marginTop         : 3,
  },
  line                : {
    position          : 'absolute',
    left              : 7,
    top               : 16,
    bottom            : -8,
    width             : 2,
    zIndex            : 0,
  },

  dotStart            : { backgroundColor: COLORS.accentRed },
  dotIntermediate     : { backgroundColor: COLORS.accentRed },
  dotEnd              : { backgroundColor: COLORS.primary },
  dotError            : { backgroundColor: COLORS.lightGray },
  lineComplete        : { backgroundColor: COLORS.accentRed },
  linePending         : { backgroundColor: COLORS.lightGray },
  lineGradient        : { backgroundColor: COLORS.primary },
  errorItem           : {
    flexDirection     : 'row',
    alignItems        : 'center',
    padding           : 20,
  },
});