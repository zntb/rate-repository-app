import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Constants from 'expo-constants';
import { onError } from '@apollo/client/link/error';

import { relayStylePagination } from '@apollo/client/utilities';

const graphqlEndpoint = Constants.expoConfig.extra.uri;

const httpLink = createHttpLink({
  uri: graphqlEndpoint,
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        repositories: relayStylePagination(),
        reviews: relayStylePagination(),
      },
    },
    Repository: {
      fields: {
        reviews: {
          keyArgs: false,
          merge(existing = { edges: [] }, incoming) {
            const existingIds = new Set(
              existing.edges.map(edge => edge.node.id),
            );
            const newEdges = incoming.edges.filter(
              edge => !existingIds.has(edge.node.id),
            );
            return {
              ...incoming,
              edges: [...existing.edges, ...newEdges],
            };
          },
        },
      },
    },
  },
});

const createApolloClient = authStorage => {
  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken();

      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
      };
    } catch (e) {
      console.log(e);

      return {
        headers,
      };
    }
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    errorLink,
    cache,
  });
};

export default createApolloClient;
