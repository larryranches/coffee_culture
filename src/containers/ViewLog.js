import React, { Component } from 'react';
import { View, TouchableOpacity, TextInput, Text } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import moment from 'moment';
import styles from './styles/ViewLog.styles';
import { colors } from '../styles/styles';

class ViewLog extends Component {
  static navigationOptions = ({ navigation }) => {
    const log = navigation.getParam('log');
    const headerDisplay = `${log.user.firstName}: ${moment(
      log.createdAt
    ).format('MMMM DD, hh:mm a')}`;
    return {
      headerTitle: headerDisplay,
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ paddingLeft: 10 }}
        >
          <FontAwesome
            name="chevron-left"
            size={25}
            color={colors.PRIMARY}
          />
        </TouchableOpacity>
      ),
    };
  };

  state = {
    notes: '',
  };

  componentDidMount() {
    this.setLogInfo();
  }

  setLogInfo = () => {
    const { navigation } = this.props;
    const log = navigation.getParam('log');

    this.setState({
      notes: log.notes,
    });
  };

  render() {
    const { notes } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={styles.label}>Notes:</Text>
          <TextInput
            style={styles.textInput}
            multiline
            editable={false}
            numberOfLines={4}
            maxLength={250}
            onChangeText={text => this.setState({ notes: text })}
            value={notes}
          />
        </View>
      </View>
    );
  }
}

ViewLog.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
};

export default ViewLog;
