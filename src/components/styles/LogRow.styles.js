import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../styles/styles';

const LogRowStyles = StyleSheet.create({
  container: {
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.PRIMARY,
    marginBottom: 5,
    padding: 5,
  },
  dateContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  infoContainer: {
    flex: 1.5,
    width: '100%',
    alignItems: 'center',
  },
  dateText: {
    fontFamily: fonts.MAIN,
    color: colors.SECONDARY,
    fontWeight: 'bold',
    fontSize: 10,
  },
  infoText: {
    fontFamily: fonts.MAIN,
    color: colors.SECONDARY,
    fontSize: 18,
  },
});

export default LogRowStyles;
