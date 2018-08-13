import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Text,
  Switch,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import Spinner from 'react-native-loading-spinner-overlay';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { StackActions, NavigationActions } from 'react-navigation';
import Button from '../components/Button';
import editLogStyles from './styles/AddLog.styles';
import spinnerStyles from '../styles/spinner';
import { colors } from '../styles/styles';
import UPDATE_LOG_MUTATION from '../graphql/mutations/UPDATE_LOG_MUTATION';
import DELETE_LOG_MUTATION from '../graphql/mutations/DELETE_LOG_MUTATION';

class EditLog extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Edit Log',
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
  });

  state = {
    logId: null,
    notes: '',
    isPrivate: false,
    isUpdatingLog: false,
    isDeletingLog: false,
  };

  componentDidMount() {
    this.setLogInfo();
  }

  onUpdateLog = async () => {
    const { logId, notes, isPrivate } = this.state;
    const { updateLog, navigation } = this.props;
    this.setState({ isUpdatingLog: true });

    try {
      await updateLog({
        variables: {
          id: logId,
          notes,
          isPrivate,
        },
      });

      this.setState({ isUpdatingLog: false });

      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Profile' })],
      });

      navigation.dispatch(resetAction);
    } catch (error) {
      const errorMessage = error.graphQLErrors[0].message;
      Alert.alert(
        'Error',
        errorMessage,
        [
          {
            text: 'Dismiss',
            onPress: () => {
              this.setState({ isUpdatingLog: false });
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  onDeleteLog = async () => {
    const { logId } = this.state;
    const { deleteLog, navigation } = this.props;
    this.setState({ isDeletingLog: true });

    try {
      await deleteLog({
        variables: {
          id: logId,
        },
      });

      this.setState({ isDeletingLog: false });

      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Profile' })],
      });

      navigation.dispatch(resetAction);
    } catch (error) {
      const errorMessage = error.graphQLErrors[0].message;
      Alert.alert(
        'Error',
        errorMessage,
        [
          {
            text: 'Dismiss',
            onPress: () => {
              this.setState({ isDeletingLog: false });
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  setLogInfo = () => {
    const { navigation } = this.props;
    const log = navigation.getParam('log');

    this.setState({
      logId: log.id,
      notes: log.notes,
      isPrivate: log.isPrivate,
    });
  };

  render() {
    const { notes, isPrivate, isUpdatingLog, isDeletingLog } = this.state;

    return (
      <View style={editLogStyles.container}>
        <Spinner
          visible={isUpdatingLog || isDeletingLog}
          textContent={isUpdatingLog ? 'UPDATING' : 'DELETING'}
          {...spinnerStyles}
        />
        <View style={editLogStyles.subContainer}>
          <Text style={editLogStyles.label}>Notes:</Text>
          <TextInput
            style={editLogStyles.textInput}
            multiline
            numberOfLines={4}
            maxLength={250}
            onChangeText={text => this.setState({ notes: text })}
            value={notes}
          />
          <View style={editLogStyles.privateContainer}>
            <Text style={editLogStyles.label}>Is this log private?:</Text>
            <Switch
              value={isPrivate}
              onValueChange={value => this.setState({ isPrivate: value })}
            />
          </View>
          <View style={editLogStyles.buttonContainer}>
            <Button text="Update" onPress={this.onUpdateLog} />
          </View>
          <View style={editLogStyles.buttonContainer}>
            <Button
              text="Delete"
              backgroundColor={colors.ERROR}
              onPress={this.onDeleteLog}
            />
          </View>
        </View>
      </View>
    );
  }
}

EditLog.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
};

const updateLog = graphql(UPDATE_LOG_MUTATION, { name: 'updateLog' });
const deleteLog = graphql(DELETE_LOG_MUTATION, { name: 'deleteLog' });

export default compose(
  updateLog,
  deleteLog
)(EditLog);
