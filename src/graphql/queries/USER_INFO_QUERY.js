import gql from 'graphql-tag';

const USER_INFO_QUERY = gql`
  query userInfo($userId: ID!) {
    allUsers(filter: { id: $userId }) {
      id
      firstName
      lastName
      email
      logs(orderBy: createdAt_DESC) {
        id
        notes
        isPrivate
        createdAt
      }
    }
  }
`;

export default USER_INFO_QUERY;
