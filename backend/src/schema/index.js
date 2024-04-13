// backend/src/schema/index.js

const { makeExecutableSchema } = require('@graphql-tools/schema');
const typeDefs = require('./typeDefs');
const studentResolvers = require('../resolvers/studentResolvers');
const courseResolvers = require('../resolvers/courseResolvers');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query: {
      ...studentResolvers.Query,
      ...courseResolvers.Query,
    },
    Mutation: {
      ...studentResolvers.Mutation,
      ...courseResolvers.Mutation,
    },
  },
});

module.exports = schema;
