import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../styles/styles';

const buttonStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.PRIMARY,
    fontFamily: fonts.MAIN,
  },
});

export default buttonStyles;
