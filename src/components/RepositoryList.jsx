import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import RepositoryListHeader from './RepositoryListHeader';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

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

  render() {
    const { repositories, handlePress } = this.props;

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
      />
    );
  }
}

const RepositoryList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const [selectedOrder, setSelectedOrder] = useState('LATEST');

  const getOrderVariables = () => {
    switch (selectedOrder) {
      case 'HIGHEST':
        return { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' };
      case 'LOWEST':
        return { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' };
      case 'LATEST':
      default:
        return { orderBy: 'CREATED_AT', orderDirection: 'DESC' };
    }
  };

  const { orderBy, orderDirection } = getOrderVariables();
  const { repositories } = useRepositories({
    orderBy,
    orderDirection,
    searchKeyword: debouncedSearchQuery,
  });

  const navigate = useNavigate();

  const handlePress = id => {
    navigate(`/repository/${id}`);
  };

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <RepositoryListContainer
      repositories={repositoryNodes}
      handlePress={handlePress}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      selectedOrder={selectedOrder}
      setSelectedOrder={setSelectedOrder}
    />
  );
};

export default RepositoryList;
