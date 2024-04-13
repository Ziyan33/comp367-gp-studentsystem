import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

// Error handling for Apollo Client
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    );
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

// HTTP link to connect Apollo Client to a GraphQL API
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql', // Adjust this to your GraphQL server URI
  // include credentials if your backend server requires authentication
  credentials: 'same-origin', // Use 'include' for CORS, 'same-origin' for same-origin policies
});

// Initialize Apollo Client with the HTTP link and a cache instance
const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
