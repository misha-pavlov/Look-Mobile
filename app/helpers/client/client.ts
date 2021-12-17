import { ApolloClient, InMemoryCache } from '@apollo/client';
import { constants } from '../../config/constants';

// instantiate apollo client with apollo link instance and cache instance
export const client = new ApolloClient({
  uri: constants.graphUrl,
  cache: new InMemoryCache(),
});
