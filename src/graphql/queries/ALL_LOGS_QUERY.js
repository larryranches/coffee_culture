import gql from 'graphql-tag';

const ALL_LOGS_QUERY = gql`
  query allLogs($isPrivate: Boolean) {
    allLogses(filter: { isPrivate: $isPrivate }, orderBy: createdAt_DESC) {
      id
      user {
        id
        firstName
        lastName
        email
      }
      notes
      isPrivate
      createdAt
    }
  }
`;

export default ALL_LOGS_QUERY;
