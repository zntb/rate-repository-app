import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
  },
});

const RepositoryListHeader = ({ selectedOrder, setSelectedOrder }) => {
  return (
    <View style={styles.container}>
      <Picker
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
