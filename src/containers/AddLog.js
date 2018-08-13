import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Text,
  Switch,
  Alert,
} from 'react-native';
import { graphql, compose } from 'react-apollo';
import Spinner from 'react-native-loading-spinner-overlay';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { StackActions, NavigationActions } from 'react-navigation';
import Button from '../components/Button';
import addlogStyles from './styles/AddLog.styles';
import spinnerStyles from '../styles/spinner';
import { colors } from '../styles/styles';
import { getStorage, STORAGE_USER_ID_KEY } from '../config/storage';
import CREATE_LOG_MUTATION from '../graphql/mutations/CREATE_LOG_MUTATION';

class AddLog extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: 'Add Log',
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
    notes: '',
    isPrivate: false,
    isAddingLog: false,
  };

  componentDidMount() {}

  onAddLog = async () => {
    const { notes, isPrivate } = this.state;
    this.setState({ isAddingLog: true });

    try {
      const { createLog, navigation } = this.props;

      const userId = await getStorage(STORAGE_USER_ID_KEY);

      await createLog({
        variables: {
          userId,
          notes,
          isPrivate,
        },
      });

      this.setState({ isAddingLog: false });

      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Feed' })],
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
              this.setState({ isAddingLog: false });
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  render() {
    const { notes, isPrivate, isAddingLog } = this.state;
    return (
      <View style={addlogStyles.container}>
        <Spinner
          visible={isAddingLog}
          textContent="ADDING LOG..."
          {...spinnerStyles}
        />
        <View style={addlogStyles.subContainer}>
          <Text style={addlogStyles.label}>Notes:</Text>
          <TextInput
            style={addlogStyles.textInput}
            multiline
            numberOfLines={4}
            maxLength={250}
            onChangeText={text => this.setState({ notes: text })}
            value={notes}
          />
          <View
            style={{
              flexDirection: 'row',
              paddingTop: 15,
              alignItems: 'center',
            }}
          >
            <Text style={addlogStyles.label}>Is this log private?:</Text>
            <Switch
              value={isPrivate}
              onValueChange={value => this.setState({ isPrivate: value })}
            />
          </View>
          <View style={addlogStyles.buttonContainer}>
            <Button text="Add" onPress={this.onAddLog} />
          </View>
        </View>
      </View>
    );
  }
}

const createLog = graphql(CREATE_LOG_MUTATION, { name: 'createLog' });

export default compose(createLog)(AddLog);
