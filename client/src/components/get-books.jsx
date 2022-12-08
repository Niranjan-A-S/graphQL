import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { LOAD_USERS } from "../graphql/queries";

export const BookList = () => {
  const executeQuery = useQuery;
  const { data } = useQuery(LOAD_USERS);

  const [books, setBooks] = useState([]);

  useEffect(() => {
    data && setBooks(data.books);
  }, [data, books]);

  return (
    <div>
      {books.map((book) => (
        <section key={book.id}>
          <h3>
            {book.id} {book.name}
          </h3>
          <p>by {book?.author?.name}</p>
        </section>
      ))}
    </div>
  );
};
