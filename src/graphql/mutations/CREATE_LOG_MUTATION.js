import gql from 'graphql-tag';

const CREATE_LOG_MUTATION = gql`
  mutation createLog($userId: ID!, $notes: String, $isPrivate: Boolean) {
    createLogs(userId: $userId, notes: $notes, isPrivate: $isPrivate) {
      id
    }
  }
`;

export default CREATE_LOG_MUTATION;
