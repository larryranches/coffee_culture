import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../styles/styles';

const signInStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.PRIMARY,
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingTop: 25,
  },
  inputContainer: {
    width: '100%',
    paddingBottom: 5,
  },
  textInput: {
    height: 40,
    fontFamily: fonts.MAIN,
    color: colors.SECONDARY,
    borderColor: colors.SECONDARY,
    borderWidth: 0.5,
  },
  buttonContainer: {
    width: '100%',
  },
  errorContainer: {
    alignItems: 'flex-start',
    width: '100%',
    paddingBottom: 2,
  },
  errorText: {
    fontFamily: fonts.MAIN,
    color: colors.ERROR,
    fontSize: 12,
  },
  imageStyle: {
    width: 250,
    height: 250,
  },
});

export default signInStyles;
