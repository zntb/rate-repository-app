import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';
import { useParams } from 'react-router-native';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import ReviewItem from './ReviewItem';
import RepositoryInfo from './RepositoryInfo';
import { FlatList } from 'react-native';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#f1f1f1',
  },
});

const SingleRepository = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { id, first: 10 },
  });

  if (loading) return <ActivityIndicator size='large' />;
  if (error) return <Text>Error loading repository</Text>;

  const repository = data.repository;
  const reviews = repository.reviews.edges.map(edge => edge.node);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={item => item.id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

export default SingleRepository;
