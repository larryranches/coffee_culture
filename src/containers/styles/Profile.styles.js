import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../styles/styles';

const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.PRIMARY,
    marginBottom: 10,
  },
  nameText: {
    fontFamily: fonts.MAIN,
    color: colors.SECONDARY,
    fontWeight: 'bold',
    fontSize: 24,
  },
  emailText: {
    fontFamily: fonts.MAIN,
    color: colors.SECONDARY,
    fontWeight: '600',
    fontSize: 20,
  },
  logoutText: {
    fontFamily: fonts.MAIN,
    color: colors.ERROR,
    fontWeight: '600',
    fontSize: 12,
    paddingTop: 10,
  },
});

export default profileStyles;
