import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import Navigator from './routes/Navigator';
import client from './config/client';
import store from './config/store';

export default class Root extends Component {
  componentWillMount() {}

  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Navigator />
        </Provider>
      </ApolloProvider>
    );
  }
}
