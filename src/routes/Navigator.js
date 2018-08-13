/* eslint react/prop-types: 0 */
import React from 'react';
import {
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { colors, fonts } from '../styles/styles';
import Initializing from '../containers/Initializing';
import SignIn from '../containers/SignIn';
import Feed from '../containers/Feed';
import Profile from '../containers/Profile';
import AddLog from '../containers/AddLog';
import EditLog from '../containers/EditLog';
import ViewLog from '../containers/ViewLog';

const AuthStackNavigator = createStackNavigator({
  SignIn,
});

const AppTabNavigator = createBottomTabNavigator(
  {
    Feed: createStackNavigator({
      Feed: {
        screen: Feed,
        navigationOptions: {
          headerTitle: 'FEED',
          headerStyle: {
            color: colors.PRIMARY,
            backgroundColor: colors.SECONDARY,
          },
          headerTitleStyle: {
            color: colors.PRIMARY,
            zIndex: 1,
            fontSize: 18,
            fontFamily: fonts.MAIN,
          },
        },
      },
      AddLog: {
        screen: AddLog,
        navigationOptions: {
          headerStyle: {
            color: colors.PRIMARY,
            backgroundColor: colors.SECONDARY,
          },
          headerTitleStyle: {
            color: colors.PRIMARY,
            zIndex: 1,
            fontSize: 18,
            fontFamily: fonts.MAIN,
          },
        },
      },
      ViewLog: {
        screen: ViewLog,
        navigationOptions: {
          headerStyle: {
            color: colors.PRIMARY,
            backgroundColor: colors.SECONDARY,
          },
          headerTitleStyle: {
            color: colors.PRIMARY,
            zIndex: 1,
            fontSize: 18,
            fontFamily: fonts.MAIN,
          },
        },
      },
    }),
    Profile: createStackNavigator({
      Profile: {
        screen: Profile,
        navigationOptions: {
          headerTitle: 'PROFILE',
          headerStyle: {
            color: colors.PRIMARY,
            backgroundColor: colors.SECONDARY,
          },
          headerTitleStyle: {
            color: colors.PRIMARY,
            zIndex: 1,
            fontSize: 18,
            fontFamily: fonts.MAIN,
          },
        },
      },
      EditLog: {
        screen: EditLog,
        navigationOptions: {
          headerStyle: {
            color: colors.PRIMARY,
            backgroundColor: colors.SECONDARY,
          },
          headerTitleStyle: {
            color: colors.PRIMARY,
            zIndex: 1,
            fontSize: 18,
            fontFamily: fonts.MAIN,
          },
        },
      },
    }),
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Feed') {
          iconName = 'coffee';
        } else if (routeName === 'Profile') {
          iconName = 'user';
        }
        return <FontAwesome name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      style: {
        backgroundColor: colors.SECONDARY,
      },
      activeTintColor: colors.PRIMARY,
      inactiveTintColor: '#A0A0A0',
      showLabel: false,
    },
  }
);

export default createSwitchNavigator(
  {
    Initializing,
    Auth: AuthStackNavigator,
    App: AppTabNavigator,
  },
  {
    initialRouteName: 'Initializing',
  }
);
