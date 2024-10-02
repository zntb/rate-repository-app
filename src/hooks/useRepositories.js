import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({
  orderBy,
  orderDirection,
  searchKeyword,
  first = 4,
}) => {
  const { data, loading, error, fetchMore, ...result } = useQuery(
    GET_REPOSITORIES,
    {
      variables: { orderBy, orderDirection, searchKeyword, first },
      fetchPolicy: 'cache-and-network',
    },
  );

  const handleFetchMore = async () => {
    const canFetchMore =
      !loading &&
      data?.repositories?.pageInfo &&
      data.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    try {
      await fetchMore({
        variables: {
          after: data.repositories.pageInfo.endCursor,
          orderBy,
          orderDirection,
          searchKeyword,
          first,
        },
      });
    } catch (fetchMoreError) {
      console.error('Error fetching more repositories:', fetchMoreError);
    }
  };

  return {
    repositories: data ? data.repositories : undefined,
    fetchMore: handleFetchMore,
    loading,
    error,
    ...result,
  };
};

export default useRepositories;
