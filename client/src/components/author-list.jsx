import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState, useCallback } from "react";
import { ADD_AUTHOR_MUTATION } from "../graphql/mutations";
import { LOAD_AUTHORS } from "../graphql/queries";

export const AuthorList = () => {
  const { data } = useQuery(LOAD_AUTHORS);

  const [addAuthor] = useMutation(ADD_AUTHOR_MUTATION);

  const [authorName, setAuthorName] = useState("");

  const createAuthor = useCallback(() => {
    addAuthor({
      variables: {
        name: authorName,
      },
    });
  }, [authorName]);

  return (
    <div>
      <h1>AuthorList</h1>
      {data &&
        data.authors.map((author) => (
          <section key={author.id}>
            <h3>{author.name}</h3>
          </section>
        ))}
      <input
        type="text"
        placeholder="Enter author name"
        value={authorName}
        onChange={(event) => setAuthorName(event.target.value)}
      />
      <button onClick={createAuthor}>Add Author</button>
    </div>
  );
};
