import { gql } from "@apollo/client";

export const ADD_BOOK_MUTATION = gql`
  mutation addBook($name: String!, $authorId: Int!) {
    addBook(name: $name, authorId: $authorId) {
      authorId
    }
  }
`;

// export const ADD_AUTHOR_MUTATION = gql`
// mutation addAuthor() {
//     addAuthor() {

//     }
// }`;
