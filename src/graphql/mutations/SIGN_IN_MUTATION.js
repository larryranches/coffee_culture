import gql from 'graphql-tag';

const SIGN_IN_MUTATION = gql`
  mutation signinUser($email: String!, $password: String!) {
    signinUser(email: { email: $email, password: $password }) {
      token
      user {
        id
      }
    }
  }
`;

export default SIGN_IN_MUTATION;
