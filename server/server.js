const express = require('express');
const path = require('path');
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

// import graphql typeDefs and resolvers
const { typeDefs, resolver } = require('./schemas');

// Set up for Apollo server
const { authMiddleware } = require('./utils/auth');
const { ApolloServer } = require('apollo-server-express');
const startServer = async () => {
  // create new Apollo server and pass in schema data
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
  });
  // start server
  await server.start();
  // integrate Apollo server with Express application as middleware
  server.applyMiddleware({ app });

  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};

// initialize Apollo server
startServer();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// for production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
  app.listen(PORT, () => console.log(`API server running on localhost:${PORT}`));
});
