import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { ReduxCache } from 'apollo-cache-redux';
import ReduxLink from 'apollo-link-redux';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { GRAPHQL_END_POINT } from 'react-native-dotenv';
import { getStorage, STORAGE_ACCESS_TOKEN_KEY } from './storage';
import store from './store';

const cache = new ReduxCache({ store });

const reduxLink = new ReduxLink(store);

const errorLink = onError(errors => {
  console.log('APOLLO LINK ERRORS: ', errors);
});

const httpLink = createHttpLink({
  uri: GRAPHQL_END_POINT,
});

const authLink = setContext(async (req, { headers }) => {
  try {
    const token = await getStorage(STORAGE_ACCESS_TOKEN_KEY);

    return {
      ...headers,
      headers: {
        authorization: token ? `Bearer ${token}` : null,
      },
    };
  } catch (error) {
    throw new Error(error);
  }
});

const link = ApolloLink.from([reduxLink, errorLink, authLink, httpLink]);

const client = new ApolloClient({
  link,
  cache,
});

export default client;
