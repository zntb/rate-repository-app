import React, { useState } from 'react';
import { Text, FlatList, View, StyleSheet, Pressable } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useNavigate } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import RepositoryListHeader from './RepositoryListHeader';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: { height: 10 },
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
  footerText: { color: 'gray' },
});

const ItemSeparator = () => <View style={styles.separator} />;

const Footer = ({ hasNextPage }) => (
  <View style={styles.footer}>
    {hasNextPage ? (
      <ActivityIndicator animating size='small' color='#6200ee' />
    ) : (
      <Text style={styles.footerText}>No more repositories to load.</Text>
    )}
  </View>
);

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { searchQuery, setSearchQuery, selectedOrder, setSelectedOrder } =
      this.props;
    return (
      <RepositoryListHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedOrder={selectedOrder}
        setSelectedOrder={setSelectedOrder}
      />
    );
  };

  renderFooter = () => {
    const { hasNextPage } = this.props;
    return <Footer hasNextPage={hasNextPage} />;
  };

  render() {
    const { repositories, handlePress, onEndReach, loadingMore } = this.props;

    return (
      <FlatList
        data={repositories}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => handlePress(item.id)}>
            <RepositoryItem repository={item} />
          </Pressable>
        )}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={this.renderHeader}
        ListFooterComponent={this.renderFooter}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator
        loadingMore={loadingMore}
      />
    );
  }
}

const RepositoryList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const [selectedOrder, setSelectedOrder] = useState('LATEST');
  const [loadingMore, setLoadingMore] = useState(false);

  const getOrderVariables = () => {
    switch (selectedOrder) {
      case 'HIGHEST':
        return { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' };
      case 'LOWEST':
        return { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' };
      default:
        return { orderBy: 'CREATED_AT', orderDirection: 'DESC' };
    }
  };

  const { orderBy, orderDirection } = getOrderVariables();
  const { repositories, loading, error, fetchMore } = useRepositories({
    orderBy,
    orderDirection,
    searchKeyword: debouncedSearchQuery,
    first: 4,
  });

  const navigate = useNavigate();

  const handlePress = id => navigate(`/repository/${id}`);

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  const onEndReach = async () => {
    if (!loadingMore && repositories?.pageInfo?.hasNextPage) {
      setLoadingMore(true);
      try {
        await fetchMore();
      } catch (error) {
        console.error('Error fetching more data:', error);
      } finally {
        setLoadingMore(false);
      }
    }
  };

  if (error) {
    let errorMessage;

    if (error.networkError) {
      errorMessage = 'Network error: Please check your connection.';
    } else {
      errorMessage = `Error fetching repositories: ${error.message}`;
    }

    return (
      <View style={styles.error}>
        <Text style={styles.error}>{errorMessage}</Text>
      </View>
    );
  }

  if (loading && !repositories) {
    return (
      <View style={styles.footer}>
        <ActivityIndicator animating size='small' color='#6200ee' />
      </View>
    );
  }

  return (
    <RepositoryListContainer
      repositories={repositoryNodes}
      handlePress={handlePress}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      selectedOrder={selectedOrder}
      setSelectedOrder={setSelectedOrder}
      onEndReach={onEndReach}
      loadingMore={loadingMore}
      hasNextPage={repositories?.pageInfo?.hasNextPage}
    />
  );
};

export default RepositoryList;
