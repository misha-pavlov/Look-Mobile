import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { constants } from '../../config/constants';

const link = new HttpLink({
  uri: constants.graphUrl,
});

// create an inmemory cache instance for caching graphql data
const cache = new InMemoryCache();

// instantiate apollo client with apollo link instance and cache instance
export const client = new ApolloClient({
  link,
  cache,
});
