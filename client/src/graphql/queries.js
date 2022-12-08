import { gql } from "@apollo/client";

export const LOAD_BOOKS = gql`
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

export const LOAD_AUTHORS = gql`
  {
    authors {
      name
      id
    }
  }
`;
