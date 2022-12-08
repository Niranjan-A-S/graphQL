import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { LOAD_BOOKS } from "../graphql/queries";

export const BookList = () => {
  const { data } = useQuery(LOAD_BOOKS);

  const [books, setBooks] = useState([]);

  useEffect(() => {
    data && setBooks(data.books);
  }, [data, books]);

  return (
    <div>
      <h1>BookList</h1>
      {books.map((book) => (
        <section key={book.id}>
          <h3>
            {book.id} {book.name}
          </h3>
          <p>by {book?.author?.name}</p>
        </section>
      ))}
      <hr />
    </div>
  );
};
