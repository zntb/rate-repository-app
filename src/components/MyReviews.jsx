import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../graphql/queries';
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  error: {
    color: 'red',
  },
});

const MyReviews = () => {
  const { loading, error, data, refetch } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <ActivityIndicator size='large' />;
  if (error) return <Text style={styles.error}>Error fetching reviews.</Text>;

  const reviews = data.me.reviews.edges.map(edge => edge.node);

  return (
    <View style={styles.container}>
      <FlatList
        data={reviews}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ReviewItem
            review={item}
            showRepositoryName={true}
            refetch={refetch}
          />
        )}
      />
    </View>
  );
};

export default MyReviews;
