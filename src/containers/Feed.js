import React, { Component } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import Spinner from 'react-native-loading-spinner-overlay';
import Feather from 'react-native-vector-icons/Feather';
import { colors } from '../styles/styles';
import spinnerStyles from '../styles/spinner';
import ALL_LOGS_QUERY from '../graphql/queries/ALL_LOGS_QUERY';
import LogRow from '../components/LogRow';

class Feed extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <TouchableOpacity
        style={{ paddingRight: 10 }}
        onPress={() => navigation.navigate('AddLog')}
      >
        <Feather name="plus-circle" size={22} color={colors.PRIMARY} />
      </TouchableOpacity>
    ),
  });

  state = {
    isRefreshing: false,
  };

  componentDidMount() {
    const { navigation } = this.props;
    navigation.addListener('willFocus', () => {
      this.refetchData();
    });
  }

  onLogPress = item => {
    const { navigation } = this.props;
    navigation.navigate('ViewLog', { log: item });
  };

  refetchData = async () => {
    const { data } = this.props;
    this.setState({ isRefreshing: true });

    try {
      await data.refetch();
      this.setState({ isRefreshing: false });
    } catch (error) {
      throw new Error(error);
    }
  };

  render() {
    const {
      data: { loading, allLogses },
    } = this.props;
    const { isRefreshing } = this.state;

    if (loading || isRefreshing) {
      return (
        <View>
          <Spinner
            visible={loading || isRefreshing}
            textContent="LOADING..."
            {...spinnerStyles}
          />
        </View>
      );
    }

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={this.refetchData}
          />
        }
      >
        {allLogses.map(log => (
          <LogRow
            key={log.id}
            firstName={log.user.firstName}
            lastName={log.user.lastName}
            createdAt={log.createdAt}
            isPrivate={log.isPrivate}
            onPress={() => this.onLogPress(log)}
          />
        ))}
      </ScrollView>
    );
  }
}

Feed.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    allLogses: PropTypes.array,
  }).isRequired,
  navigation: PropTypes.shape({}).isRequired,
};

const allLogs = graphql(ALL_LOGS_QUERY, {
  options: { variables: { isPrivate: false } },
});

export default compose(allLogs)(Feed);
