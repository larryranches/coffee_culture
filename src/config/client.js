import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { ReduxCache } from 'apollo-cache-redux';
import ReduxLink from 'apollo-link-redux';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { GRAPHQL_END_POINT } from 'react-native-dotenv';
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
  // todo: token in asyncstorage
  const token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MzY1MjI3MTcsImlhdCI6MTUzMzkzMDcxNywicHJvamVjdElkIjoiY2prbXhxamluMmc0djAxMjlsaHRqamNlbCIsInVzZXJJZCI6ImNqa24yc3dzdTBmc2UwMTc5OHJscm5uMTkiLCJhdXRoRGF0YSI6eyJlbWFpbCI6ImxyYW5jaGVzanJAZ21haWwuY29tIn0sIm1vZGVsTmFtZSI6IlVzZXIifQ.ivT2DoxDS3a1wS8JIUu4qaMjJjoD-6zH2f6oFa20WUA';
  return {
    ...headers,
    headers: {
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const link = ApolloLink.from([reduxLink, errorLink, authLink, httpLink]);

const client = new ApolloClient({
  link,
  cache,
});

export default client;
