import { View, Text, StyleSheet, Alert } from 'react-native';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-native';
import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';
import Button from './Button';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  ratingContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#0366d6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  rating: { color: '#0366d6', fontSize: 18, fontWeight: 'bold' },
  reviewContent: { flex: 1 },
  username: { fontWeight: 'bold', marginBottom: 5 },
  date: { color: '#666', marginBottom: 5 },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

const ReviewItem = ({
  review,
  showRepositoryName = false,
  refetch,
  showActions = true,
}) => {
  const { text, rating, createdAt, user, repository, id } = review;
  const formattedDate = format(new Date(createdAt), 'dd.MM.yyyy');
  const navigate = useNavigate();
  const [deleteReview] = useMutation(DELETE_REVIEW, {
    onCompleted: () => {
      refetch();
    },
  });

  const handleDelete = () => {
    Alert.alert(
      'Delete Review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteReview({ variables: { id } });
            } catch (e) {
              console.error(e);
            }
          },
        },
      ],
      { cancelable: true },
    );
  };

  const handleViewRepository = () => {
    navigate(`/repository/${repository.id}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>{rating}</Text>
      </View>
      <View style={styles.reviewContent}>
        {showRepositoryName ? (
          <Text style={styles.username}>{repository.fullName}</Text>
        ) : (
          <Text style={styles.username}>{user?.username || 'Anonymous'}</Text>
        )}
        <Text style={styles.date}>{formattedDate}</Text>
        <Text>{text}</Text>

        {showActions && (
          <View style={styles.buttonContainer}>
            <Button onPress={handleViewRepository}>View Repository</Button>
            <Button type='alertButton' onPress={handleDelete}>
              {' '}
              Delete Review
            </Button>
          </View>
        )}
      </View>
    </View>
  );
};

export default ReviewItem;
