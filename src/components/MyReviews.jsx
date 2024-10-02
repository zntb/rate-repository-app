import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../graphql/queries';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  error: {
    padding: 5,
    color: 'red',
    textAlign: 'center',
  },
  footer: {
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noMoreText: {
    color: 'gray',
    textAlign: 'center',
  },
  noReviewsText: {
    textAlign: 'center',
    marginTop: 20,
  },
});

const Footer = ({ hasNextPage }) => (
  <View style={styles.footer}>
    {hasNextPage ? (
      <ActivityIndicator animating size='small' color='#6200ee' />
    ) : (
      <Text style={styles.noMoreText}>No more reviews to load.</Text>
    )}
  </View>
);

const MyReviews = () => {
  const [loadingMore, setLoadingMore] = useState(false);
  const { data, loading, fetchMore, error, refetch } = useQuery(
    GET_CURRENT_USER,
    {
      variables: { includeReviews: true, first: 2 },
      fetchPolicy: 'cache-and-network',
    },
  );

  if (error) {
    if (error.networkError) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.error}>
            Server is unavailable. Please try again later.
          </Text>
        </View>
      );
    }

    return (
      <Text style={styles.error}>Error fetching reviews: {error.message}</Text>
    );
  }

  const reviews = data?.me?.reviews?.edges?.map(edge => edge.node) || [];
  const { hasNextPage, endCursor } = data?.me?.reviews?.pageInfo || {};

  const handleFetchMore = async () => {
    if (!loadingMore && hasNextPage) {
      setLoadingMore(true);
      try {
        await fetchMore({
          variables: {
            after: endCursor,
            first: 2,
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            if (!fetchMoreResult) return previousResult;

            const newEdges = fetchMoreResult.me.reviews.edges;
            const existingEdges = previousResult.me.reviews.edges;

            const mergedEdges = [...existingEdges, ...newEdges].filter(
              (edge, index, self) =>
                index === self.findIndex(e => e.node.id === edge.node.id),
            );

            return {
              ...previousResult,
              me: {
                ...previousResult.me,
                reviews: {
                  ...previousResult.me.reviews,
                  edges: mergedEdges,
                  pageInfo: fetchMoreResult.me.reviews.pageInfo,
                },
              },
            };
          },
        });
      } catch (error) {
        console.error('Error fetching more reviews:', error);
      } finally {
        setLoadingMore(false);
      }
    }
  };

  if (loading && !data) {
    return <ActivityIndicator animating size='small' color='#6200ee' />;
  }

  if (reviews.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noReviewsText}>
          You have not rated any repositories yet.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={reviews}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ReviewItem review={item} showRepositoryName refetch={refetch} />
        )}
        onEndReached={handleFetchMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={<Footer hasNextPage={hasNextPage} />}
        onRefresh={refetch}
        refreshing={loading}
      />
    </View>
  );
};

export default MyReviews;
