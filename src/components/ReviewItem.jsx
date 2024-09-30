import { View, Text, StyleSheet } from 'react-native';
import { format } from 'date-fns';

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
});

const ReviewItem = ({ review }) => {
  const { text, rating, createdAt, user } = review;
  const formattedDate = format(new Date(createdAt), 'dd.MM.yyyy');

  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>{rating}</Text>
      </View>
      <View style={styles.reviewContent}>
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.date}>{formattedDate}</Text>
        <Text>{text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;
