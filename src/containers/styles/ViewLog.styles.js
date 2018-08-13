import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../styles/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.PRIMARY,
  },
  subContainer: {
    paddingTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  textInput: {
    height: 120,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5,
  },
  label: {
    fontFamily: fonts.MAIN,
    fontSize: 16,
    color: colors.SECONDARY,
    paddingRight: 5,
  },
  buttonContainer: {
    paddingTop: 14,
    width: '100%',
  },
});

export default styles;
