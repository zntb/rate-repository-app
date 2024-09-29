import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';
import { useParams } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import { ActivityIndicator, View, Text } from 'react-native';

const SingleRepository = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { id },
  });

  if (loading) return <ActivityIndicator size='large' />;
  if (error) return <Text>Error loading repository</Text>;

  const repository = data.repository;

  return (
    <View>
      <RepositoryItem repository={repository} showGithubButton={true} />
    </View>
  );
};

export default SingleRepository;
