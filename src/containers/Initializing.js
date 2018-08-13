import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { getStorage, STORAGE_ACCESS_TOKEN_KEY } from '../config/storage';
import styles from './styles/Initializing.styles';
import { colors } from '../styles/styles';

export default class Initializing extends Component {
  constructor(props) {
    super(props);
    this.bootstrapAsync();
  }

  bootstrapAsync = async () => {
    try {
      const accessToken = await getStorage(STORAGE_ACCESS_TOKEN_KEY);

      const { navigation } = this.props;

      if (accessToken) {
        navigation.navigate('App');
      } else {
        navigation.navigate('Auth');
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.SECONDARY} />
      </View>
    );
  }
}

Initializing.propTypes = {
  navigation: PropTypes.shape({
    navigation: PropTypes.func,
  }).isRequired,
};
