import { View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';

const RepositoryInfo = ({ repository }) => {
  return (
    <View style={styles.container}>
      <RepositoryItem repository={repository} showGithubButton={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10 },
});

export default RepositoryInfo;
