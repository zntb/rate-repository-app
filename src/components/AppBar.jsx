import { View, ScrollView, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Link, useNavigate } from 'react-router-native';
import { useApolloClient } from '@apollo/client';

import theme from '../theme';
import Text from './Text';
import useAuthStorage from '../hooks/useAuthStorage';
import useMe from '../hooks/useMe';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
  },
  scrollView: {
    flexDirection: 'row',
  },
  tabTouchable: {
    flexGrow: 0,
  },
  tabContainer: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    color: 'white',
  },
});

const AppBarTab = ({ children, ...props }) => {
  return (
    <Link style={styles.tabTouchable} {...props}>
      <View style={styles.tabContainer}>
        <Text fontWeight='bold' style={styles.tabText}>
          {children}
        </Text>
      </View>
    </Link>
  );
};

const AppBar = () => {
  const { me } = useMe();
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    navigate('/');
    console.log('Signed out ' + me.username);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} horizontal>
        <AppBarTab to='/'>Repositories</AppBarTab>
        {me ? (
          <AppBarTab to='/' onPress={handleSignOut}>
            Sign out
          </AppBarTab>
        ) : (
          <AppBarTab to='/sign-in'>Sign in</AppBarTab>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
