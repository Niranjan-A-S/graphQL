const express = require("express");
const expressGraphQL = require("express-graphql").graphqlHTTP;
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");

const app = express();

const bookList = [
  { id: 1, name: "Harry Potter and the Chamber of Secrets", authorId: 1 },
  { id: 2, name: "Harry Potter and the Prisoner of Azkaban", authorId: 1 },
  { id: 3, name: "Harry Potter and the Goblet of Fire", authorId: 1 },
  { id: 4, name: "The Fellowship of the Ring", authorId: 2 },
  { id: 5, name: "The Two Towers", authorId: 2 },
  { id: 6, name: "The Return of the King", authorId: 2 },
  { id: 7, name: "The Way of Shadows", authorId: 3 },
  { id: 8, name: "Beyond the Shadows", authorId: 3 },
];

const authors = [
  { id: 1, name: "J. K. Rowling" },
  { id: 2, name: "J. R. R. Tolkien" },
  { id: 3, name: "Brent Weeks" },
];

const schema2 = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "data",
    fields: () => ({
      message: {
        type: GraphQLString,
        resolve: () => HelloWorld,
      },
    }),
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  description: "This is the type of an author",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    books: {
      type: new GraphQLList(BookType),
      resolve: (author) =>
        bookList.filter((book) => book.authorId === author.id),
    },
  }),
});

const BookType = new GraphQLObjectType({
  name: "Book",
  description: "This is the type of a book written by an  author",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    authorId: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    author: {
      type: AuthorType,
      resolve: (book) => authors.find((author) => author.id === book.authorId),
    },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "data",
  description: "Root Query",
  fields: () => ({
    //the fields property is a function because if it was a direct object we can't use the author types and
    // book types as they reference each other
    books: {
      type: new GraphQLList(BookType),
      description: "List of all books",
      resolve: () => bookList,
    },
    book: {
      type: BookType,
      description: "A single book passing an id query",
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (_parent, args) => bookList.find((book) => book.id === args.id),
    },
    authors: {
      type: new GraphQLList(AuthorType),
      description: "List of all authors",
      resolve: () => authors,
    },
    author: {
      type: AuthorType,
      description: "A single author",
      args: { id: { type: GraphQLInt } },
      resolve: (_parent, args) =>
        authors.find((author) => author.id === args.id),
    },
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    addBook: {
      description: "Add a book",
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: (_parent, args) => {
        const book = {
          id: bookList.length + 1,
          name: args.name,
          authorId: args.authorId,
        };
        bookList.push(book);
        return book;
      },
    },
    addAuthor: {
      description: "Add an author",
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_parent, args) => {
        const author = {
          name: args.name,
          id: authors.length + 1,
        };

        authors.push(author);
        return author;
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

app.use(
  "/graphql",
  expressGraphQL({
    graphiql: true,
    schema: schema,
  })
);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server started at port ${port}`));
