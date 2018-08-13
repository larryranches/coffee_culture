import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import buttonStyles from './styles/Button.styles';
import { colors } from '../styles/styles';

const Button = ({ onPress, text, height, backgroundColor }) => (
  <TouchableOpacity
    style={[buttonStyles.container, { height, backgroundColor }]}
    onPress={onPress}
  >
    <Text style={buttonStyles.text}>{text}</Text>
  </TouchableOpacity>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  height: PropTypes.number,
  backgroundColor: PropTypes.string,
};

Button.defaultProps = {
  height: 40,
  backgroundColor: colors.SECONDARY,
};

export default Button;
