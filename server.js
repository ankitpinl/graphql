const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const authors = [
  { id: "1", info: { name: "J.K. Rowling", age: 54, gender: "F" } },
  { id: "2", info: { name: "J.R.R. Tolkien", age: 81, gender: "M" } },
];

const typeDefs = `
    type Author { 
        id: ID!
        info: Person
    }
    type Person {
        name: String!
        age: Int
        gender: String
    }
    type Query {
        getAuthors: [Author]
        retrieveAuthor(id: ID!): Author
    }
`;

const resolvers = {
  Query: {
    getAuthors: () => authors,
    retrieveAuthor: (obj, { id }) => authors.find((author) => author.id === id),
  },
};

async function startServer() {
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start(); // Required step before applying middleware

  server.applyMiddleware({ app, path: "/graphql" });

  app.listen({ port: 4000 }, () =>
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
    )
  );
}

startServer().catch((err) => console.error(err));
