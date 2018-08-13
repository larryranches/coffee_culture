import gql from 'graphql-tag';

const DELETE_LOG_MUTATION = gql`
  mutation deleteLog($id: ID!) {
    deleteLogs(id: $id) {
      id
    }
  }
`;

export default DELETE_LOG_MUTATION;
