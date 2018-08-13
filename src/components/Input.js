import React from 'react';
import { TextInput } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles/Input.styles';
import { colors } from '../styles/styles';

const Input = ({
  placeholder,
  onChangeText,
  value,
  borderColor,
  secureTextEntry,
}) => (
  <TextInput
    style={[styles.container, { borderColor }]}
    placeholder={placeholder}
    autoCorrect={false}
    autoCapitalize="none"
    underlineColorAndroid="transparent"
    onChangeText={onChangeText}
    value={value}
    secureTextEntry={secureTextEntry}
  />
);

Input.propTypes = {
  placeholder: PropTypes.string,
  onChangeText: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  borderColor: PropTypes.string,
  secureTextEntry: PropTypes.bool,
};

Input.defaultProps = {
  placeholder: '',
  borderColor: colors.SECONDARY,
  secureTextEntry: false,
};

export default Input;
