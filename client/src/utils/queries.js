import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query allUsers {
    users {
      _id
      username
      email
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
    query singleUser($userId: ID!) {
        user(userIdL $userId) {
           _id
           username
           email
        }
    }
`;
