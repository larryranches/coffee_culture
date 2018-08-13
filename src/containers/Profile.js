import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import Spinner from 'react-native-loading-spinner-overlay';
import spinnerStyles from '../styles/spinner';
import profileStyles from './styles/Profile.styles';
import LogRow from '../components/LogRow';
import USER_INFO_QUERY from '../graphql/queries/USER_INFO_QUERY';
import {
  getStorage,
  STORAGE_USER_ID_KEY,
  removeStorage,
  STORAGE_ACCESS_TOKEN_KEY,
} from '../config/storage';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.setUserId();
  }

  state = {
    userId: '',
    isLoggingOut: false,
  };

  onLogout = async () => {
    this.setState({ isLoggingOut: true });
    try {
      await removeStorage(STORAGE_USER_ID_KEY);
      await removeStorage(STORAGE_ACCESS_TOKEN_KEY);

      const { navigation } = this.props;
      navigation.navigate('Auth');
    } catch (error) {
      throw new Error(error);
    }
  };

  onLogPress = item => {
    const { navigation } = this.props;
    navigation.navigate('EditLog', { log: item });
  };

  setUserId = async () => {
    try {
      const userId = await getStorage(STORAGE_USER_ID_KEY);

      this.setState({
        userId,
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  render() {
    const { userId, isLoggingOut } = this.state;
    return (
      <Query
        query={USER_INFO_QUERY}
        pollInterval={1000}
        variables={{ userId }}
      >
        {({ loading, data }) => {
          if (loading || isLoggingOut)
            return (
              <Spinner
                visible={loading || isLoggingOut}
                textContent={loading ? 'LOADING...' : 'LOGGING OUT...'}
                {...spinnerStyles}
              />
            );
          return (
            <View style={profileStyles.container}>
              <View style={profileStyles.profileContainer}>
                <Text style={profileStyles.nameText}>
                  {`${data.allUsers[0].firstName} ${
                    data.allUsers[0].lastName
                  }`}
                </Text>
                <Text style={profileStyles.emailText}>
                  {`${data.allUsers[0].email}`}
                </Text>
                <TouchableOpacity onPress={this.onLogout}>
                  <Text style={profileStyles.logoutText}>Logout</Text>
                </TouchableOpacity>
              </View>
              <ScrollView showsVerticalScrollIndicator={false}>
                {data.allUsers[0].logs.map(log => (
                  <LogRow
                    key={log.id}
                    firstName="You"
                    lastName=""
                    createdAt={log.createdAt}
                    isPrivate={log.isPrivate}
                    onPress={() => this.onLogPress(log)}
                  />
                ))}
              </ScrollView>
            </View>
          );
        }}
      </Query>
    );
  }
}

Profile.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
};

export default Profile;
