import { gql } from "@apollo/client";

export const LOAD_USERS = gql`
  {
    books {
      name
      id
      authorId
      author {
        name
      }
    }
  }
`;
