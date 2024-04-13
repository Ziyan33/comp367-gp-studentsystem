// backend/src/app.js

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const { connectDB } = require('./services/dbService');
const { authenticate } = require('./utils/auth');
const schema = require('./schema/index');
require('dotenv').config();

async function startServer() {
  // Connect to the database
  connectDB();

  const app = express();

  // Configure CORS
  app.use(cors({
    origin: ['http://localhost:5173'], // Specify the frontend origin for development
    credentials: true, // Enable credentials for cookies, etc.
  }));

  // Initialize Apollo Server
  const server = new ApolloServer({
    schema,
    context: ({ req }) => ({ user: req.user }), // Pass user info to resolvers
  });

  await server.start();

  // Apply middleware for Apollo GraphQL and Express
  server.applyMiddleware({ app, cors: false }); // Note: CORS false here since it's handled by Express CORS

  // Use authentication middleware before your GraphQL and other routes if needed
  app.use(authenticate);

  return app;
}

module.exports = startServer;
