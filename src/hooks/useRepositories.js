import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const { data, loading, refetch, error } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  if (error) {
    console.log(error);
  }

  return {
    repositories: data ? data.repositories : undefined,
    loading,
    refetch,
  };
};

export default useRepositories;
