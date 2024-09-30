import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import SignUpForm from './SignUpForm';
import theme from '../theme';
import SingleRepository from './SingleRepository';
import ReviewForm from './ReviewForm';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path='/' element={<RepositoryList />} exact />
        <Route path='sign-in' element={<SignIn />} exact />
        <Route path='sign-up' element={<SignUpForm />} exact />
        <Route path='/repository/:id' element={<SingleRepository />} />
        <Route path='/create-review' element={<ReviewForm />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </View>
  );
};

export default Main;
