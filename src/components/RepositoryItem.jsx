import { View, Image, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  languageTag: {
    backgroundColor: theme.colors.primary,
    color: 'white',
    padding: 5,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  countsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  countItem: {
    alignItems: 'center',
  },
  textPrimary: {
    color: theme.colors.textPrimary,
    fontWeight: theme.fontWeights.bold,
  },
  textSecondary: {
    color: theme.colors.textSecondary,
  },
});

const formatCount = value => {
  return value >= 1000 ? `${(value / 1000).toFixed(1)}k` : String(value);
};

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Image source={{ uri: item.ownerAvatarUrl }} style={styles.avatar} />
        <View style={{ marginLeft: 15, flex: 1 }}>
          <Text
            fontWeight='bold'
            fontSize='subheading'
            style={styles.textPrimary}
          >
            {item.fullName}
          </Text>
          <Text color='textSecondary' style={styles.textSecondary}>
            {item.description}
          </Text>
          <Text style={styles.languageTag}>{item.language}</Text>
        </View>
      </View>

      <View style={styles.countsContainer}>
        <View style={styles.countItem}>
          <Text fontWeight='bold'>{formatCount(item.stargazersCount)}</Text>
          <Text color='textSecondary'>Stars</Text>
        </View>
        <View style={styles.countItem}>
          <Text fontWeight='bold'>{formatCount(item.forksCount)}</Text>
          <Text color='textSecondary'>Forks</Text>
        </View>
        <View style={styles.countItem}>
          <Text fontWeight='bold'>{formatCount(item.reviewCount)}</Text>
          <Text color='textSecondary'>Reviews</Text>
        </View>
        <View style={styles.countItem}>
          <Text fontWeight='bold'>{item.ratingAverage}</Text>
          <Text color='textSecondary'>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
