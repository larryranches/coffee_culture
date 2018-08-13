import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import moment from 'moment';
import { colors } from '../styles/styles';
import logStyles from './styles/LogRow.styles';

const LogRow = ({
  firstName,
  lastName,
  createdAt,
  isPrivate,
  onPress,
}) => (
  <TouchableOpacity onPress={() => onPress()}>
    <View style={logStyles.container}>
      <View style={logStyles.dateContainer}>
        <Text style={logStyles.dateText}>
          {`${moment(createdAt).format('MMMM DD hh:mm a')}`}
        </Text>
      </View>
      {isPrivate ? (
        <FontAwesome name="lock" size={18} color={colors.SECONDARY} />
      ) : null}
      <View style={logStyles.infoContainer}>
        {firstName === 'You' && lastName === '' ? (
          <Text style={logStyles.infoText}>
            {`${firstName} had coffee`}
          </Text>
        ) : (
          <Text style={logStyles.infoText}>
            {`${firstName} ${lastName} had coffee`}
          </Text>
        )}
      </View>
    </View>
  </TouchableOpacity>
);

LogRow.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  isPrivate: PropTypes.bool.isRequired,
  onPress: PropTypes.func,
};

LogRow.defaultProps = {
  onPress: () => {},
};

export default LogRow;
