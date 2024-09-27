import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    paddingBottom: 10,
    paddingLeft: 10,
  },
  scrollContainer: {
    flexDirection: 'row',
  },
  tab: {
    color: 'white',
    fontSize: 18,
    marginRight: 20,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
        <Link to='/'>
          <Text style={styles.tab}>Repositories</Text>
        </Link>
        <Link to='/signin'>
          <Text style={styles.tab}>Sign in</Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
