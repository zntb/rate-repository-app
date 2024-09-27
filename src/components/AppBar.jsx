import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    paddingBottom: 10,
    paddingLeft: 10,
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
      <Link to='/'>
        <Text style={styles.tab}>Repositories</Text>
      </Link>
      <Link to='/signin'>
        <Text style={styles.tab}>Sign in</Text>
      </Link>
    </View>
  );
};

export default AppBar;
