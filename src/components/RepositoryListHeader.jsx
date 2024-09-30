import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
  },
  picker: {
    marginTop: 10,
    marginBottom: 10,
  },
});

const RepositoryListHeader = ({
  selectedOrder,
  setSelectedOrder,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <View style={styles.container}>
      <Searchbar
        placeholder='Search repositories'
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Picker
        style={styles.picker}
        selectedValue={selectedOrder}
        onValueChange={value => setSelectedOrder(value)}
        prompt='Select an item...'
      >
        <Picker.Item label='Latest repositories' value='LATEST' />
        <Picker.Item label='Highest rated repositories' value='HIGHEST' />
        <Picker.Item label='Lowest rated repositories' value='LOWEST' />
      </Picker>
    </View>
  );
};

export default RepositoryListHeader;
