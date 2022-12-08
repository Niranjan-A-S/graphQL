import { useMutation } from "@apollo/client";
import { useCallback, useState } from "react";
import { ADD_BOOK_MUTATION } from "../graphql/mutations";

export const Form = () => {
  const INITIAL_STATE = { name: "", authorId: 0 };
  const [{ name, authorId }, setBook] = useState(INITIAL_STATE);

  const [addBook] = useMutation(ADD_BOOK_MUTATION);

  const createBook = useCallback(() => {
    addBook({ variables: { name, authorId: +authorId } });
    setBook(INITIAL_STATE);
  }, [name, authorId]);

  return (
    <div>
      <label htmlFor="name">Name: </label>
      <br />
      <input
        id="name"
        type="text"
        placeholder="Enter the book name"
        value={name}
        onChange={(event) =>
          setBook((prev) => ({ ...prev, name: event.target.value }))
        }
      />
      <br />
      <hr />
      <label htmlFor="authorId">AuthorID: </label>
      <br />
      <input
        id="authorId"
        type="number"
        placeholder="Enter the book authorId"
        value={authorId}
        onChange={(event) =>
          setBook((prev) => ({ ...prev, authorId: event.target.value }))
        }
      />
      <br />
      <hr />
      <button type="click" onClick={createBook}>
        Submit
      </button>
      <hr />
    </div>
  );
};
