import React, { Component } from 'react';
import { View, Text, Alert, Image } from 'react-native';
import { graphql, compose } from 'react-apollo';
import Spinner from 'react-native-loading-spinner-overlay';
import _ from 'lodash';
import validator from 'validator';
import SIGN_IN_MUTATION from '../graphql/mutations/SIGN_IN_MUTATION';
import {
  setStorage,
  STORAGE_ACCESS_TOKEN_KEY,
  STORAGE_USER_ID_KEY,
} from '../config/storage';
import styles from './styles/SignIn.styles';
import spinnerStyles from '../styles/spinner';
import Input from '../components/Input';
import Button from '../components/Button';
import imageLogo from '../assets/img/coffee-culture.png';

class SignIn extends Component {
  static navigationOptions = { header: null };

  state = {
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    isLoggingIn: false,
  };

  componentWillMount() {}

  onLogin = async () => {
    await this.validateTextInputs();

    const { emailError, passwordError } = this.state;

    if (_.isEmpty(emailError) && _.isEmpty(passwordError)) {
      const { email, password } = this.state;

      this.setState({ isLoggingIn: true });

      try {
        const { signinUser } = this.props;
        const gqlResponse = await signinUser({
          variables: {
            email,
            password,
          },
        });

        const accessToken = gqlResponse.data.signinUser.token;
        const userId = gqlResponse.data.signinUser.user.id;

        if (accessToken) {
          // set acccess token in asyncStorage
          await setStorage(STORAGE_ACCESS_TOKEN_KEY, accessToken);
          await setStorage(STORAGE_USER_ID_KEY, userId);

          const { navigation } = this.props;

          navigation.navigate('App');
        }
      } catch (error) {
        const errorMessage = error.graphQLErrors[0].message;
        Alert.alert(
          'Error',
          errorMessage,
          [
            {
              text: 'Dismiss',
              onPress: () => {
                this.setState({ isLoggingIn: false });
              },
            },
          ],
          { cancelable: false }
        );
      }
    }
  };

  hasErrors = () => {
    const { email, password } = this.state;
    return !email || !validator.isEmail(email) || !password;
  };

  validateTextInputs = async () => {
    const { email, password } = this.state;

    if (this.hasErrors()) {
      let emailError = '';
      let passwordError = '';

      if (!email) {
        emailError = '* Please enter your email';
      } else if (email && !validator.isEmail(email)) {
        emailError = '* Please enter a valid email';
      }

      if (!password) {
        passwordError = '* Please enter a password';
      }

      this.setState({
        emailError,
        passwordError,
      });
    } else {
      this.resetErrorState();
    }
  };

  resetErrorState = () => {
    this.setState({ emailError: '', passwordError: '' });
  };

  renderError = error => {
    if (error) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      );
    }

    return null;
  };

  render() {
    const {
      email,
      password,
      emailError,
      passwordError,
      isLoggingIn,
    } = this.state;

    return (
      <View style={styles.container}>
        <Spinner
          visible={isLoggingIn}
          textContent="LOGGING IN..."
          {...spinnerStyles}
        />
        <View>
          <Image style={styles.imageStyle} source={imageLogo} />
        </View>
        {this.renderError(emailError)}
        <View style={styles.inputContainer}>
          <Input
            placeholder="email"
            onChangeText={input => this.setState({ email: input })}
            value={email}
          />
        </View>
        {this.renderError(passwordError)}
        <View style={styles.inputContainer}>
          <Input
            placeholder="password"
            onChangeText={input => this.setState({ password: input })}
            secureTextEntry
            value={password}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button text="LOGIN" onPress={this.onLogin} />
        </View>
      </View>
    );
  }
}

const signinUser = graphql(SIGN_IN_MUTATION, { name: 'signinUser' });

export default compose(signinUser)(SignIn);
