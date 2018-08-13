import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../styles/styles';

const inputStyles = StyleSheet.create({
  container: {
    height: 40,
    fontFamily: fonts.MAIN,
    color: colors.SECONDARY,
    borderColor: colors.SECONDARY,
    borderWidth: 0.5,
    paddingLeft: 10,
  },
});

export default inputStyles;
