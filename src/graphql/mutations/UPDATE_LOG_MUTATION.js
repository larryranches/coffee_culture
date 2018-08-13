import gql from 'graphql-tag';

const UPDATE_LOG_MUTATION = gql`
  mutation updateLog($id: ID!, $isPrivate: Boolean, $notes: String) {
    updateLogs(id: $id, isPrivate: $isPrivate, notes: $notes) {
      id
    }
  }
`;

export default UPDATE_LOG_MUTATION;
