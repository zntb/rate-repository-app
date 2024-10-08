import { View, Image, StyleSheet } from 'react-native';
import * as Linking from 'expo-linking';

import theme from '../theme';
import Text from './Text';
import Button from './Button';
import formatInThousands from '../utils/formatInThousands';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  topContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  avatarContainer: {
    flexGrow: 0,
    marginRight: 20,
  },
  contentContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },
  nameText: {
    marginBottom: 5,
  },
  descriptionText: {
    flexGrow: 1,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: theme.roundness,
  },
  countItem: {
    flexGrow: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  countItemCount: {
    marginBottom: 5,
  },
  languageContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
  languageText: {
    color: 'white',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.roundness,
    flexGrow: 0,
    paddingVertical: 3,
    paddingHorizontal: 6,
  },

  githubButton: {
    marginTop: 15,
  },
});

const CountItem = ({ label, count, testID }) => {
  return (
    <View style={styles.countItem} testID={testID}>
      <Text style={styles.countItemCount} fontWeight='bold'>
        {formatInThousands(count)}
      </Text>
      <Text color='textSecondary'>{label}</Text>
    </View>
  );
};

const RepositoryItem = ({ repository, showGithubButton }) => {
  const {
    fullName,
    description,
    language,
    forksCount,
    stargazersCount,
    ratingAverage,
    reviewCount,
    ownerAvatarUrl,
    url,
  } = repository;

  const handleOpenInGitHub = () => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container} testID='repositoryItem'>
      <View style={styles.topContainer}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: ownerAvatarUrl }} style={styles.avatar} />
        </View>
        <View style={styles.contentContainer}>
          <Text
            style={styles.nameText}
            fontWeight='bold'
            fontSize='subheading'
            numberOfLines={1}
          >
            {fullName}
          </Text>
          <Text
            testID='description'
            style={styles.descriptionText}
            color='textSecondary'
          >
            {description}
          </Text>
          {language ? (
            <View style={styles.languageContainer}>
              <Text testID='language' style={styles.languageText}>
                {language}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <CountItem testID='stars' count={stargazersCount} label='Stars' />
        <CountItem testID='forks' count={forksCount} label='Forks' />
        <CountItem testID='reviews' count={reviewCount} label='Reviews' />
        <CountItem testID='rating' count={ratingAverage} label='Rating' />
      </View>
      {showGithubButton && (
        <Button style={styles.githubButton} onPress={handleOpenInGitHub}>
          Open in GitHub
        </Button>
      )}
    </View>
  );
};

export default RepositoryItem;
