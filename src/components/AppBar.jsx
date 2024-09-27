import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
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
        <Link to='/tab3'>
          <Text style={styles.tab}>Tab 3</Text>
        </Link>
        <Link to='/tab4'>
          <Text style={styles.tab}>Tab 4</Text>
        </Link>
        <Link to='/tab5'>
          <Text style={styles.tab}>Tab 5</Text>
        </Link>
        <Link to='/tab6'>
          <Text style={styles.tab}>Tab 6</Text>
        </Link>
        <Link to='/tab7'>
          <Text style={styles.tab}>Tab 7</Text>
        </Link>
        <Link to='/tab8'>
          <Text style={styles.tab}>Tab 8</Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
