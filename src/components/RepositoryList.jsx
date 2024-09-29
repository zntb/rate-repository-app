import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories } = useRepositories();
  const navigate = useNavigate();

  const handlePress = id => {
    navigate(`/repository/${id}`);
  };

  const renderItem = ({ item }) => (
    <Pressable onPress={() => handlePress(item.id)}>
      <RepositoryItem repository={item} />
    </Pressable>
  );

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default RepositoryList;
