import { ApolloClient, InMemoryCache } from '@apollo/client';
import Constants from 'expo-constants';

const graphqlEndpoint = Constants.expoConfig.extra.uri;

const createApolloClient = () => {
  return new ApolloClient({
    uri: graphqlEndpoint,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
