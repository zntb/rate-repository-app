import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import { CREATE_REVIEW } from '../graphql/mutations';
import { GET_REPOSITORY } from '../graphql/queries';

const styles = StyleSheet.create({
  form: { padding: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 },
  multiline: { height: 100 },
  error: { color: 'red', marginBottom: 10 },
});

const ReviewForm = () => {
  const [createReview] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    ownerName: Yup.string().required('Repository owner name is required'),
    repositoryName: Yup.string().required('Repository name is required'),
    rating: Yup.number()
      .min(0, 'Rating must be between 0 and 100')
      .max(100, 'Rating must be between 0 and 100')
      .required('Rating is required'),
    text: Yup.string(),
  });

  const onSubmit = async values => {
    const { ownerName, repositoryName, rating, text } = values;

    try {
      const { data } = await createReview({
        variables: {
          review: {
            ownerName,
            repositoryName,
            rating: Number(rating),
            text,
          },
        },
        refetchQueries: [
          {
            query: GET_REPOSITORY,
            variables: { id: data?.createReview?.repositoryId },
          },
        ],
      });

      if (data && data.createReview) {
        const repositoryId = data.createReview.repositoryId;
        navigate(`/repository/${repositoryId}`);
      } else {
        console.error('createReview response is undefined or invalid:', data);
      }
    } catch (error) {
      console.error('Error while creating review:', error);
    }
  };

  return (
    <Formik
      initialValues={{
        ownerName: '',
        repositoryName: '',
        rating: '',
        text: '',
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View style={styles.form}>
          <TextInput
            placeholder='Repository owner name'
            onChangeText={handleChange('ownerName')}
            onBlur={handleBlur('ownerName')}
            value={values.ownerName}
            style={styles.input}
          />
          {touched.ownerName && errors.ownerName && (
            <Text style={styles.error}>{errors.ownerName}</Text>
          )}

          <TextInput
            placeholder='Repository name'
            onChangeText={handleChange('repositoryName')}
            onBlur={handleBlur('repositoryName')}
            value={values.repositoryName}
            style={styles.input}
          />
          {touched.repositoryName && errors.repositoryName && (
            <Text style={styles.error}>{errors.repositoryName}</Text>
          )}

          <TextInput
            placeholder='Rating between 0 and 100'
            keyboardType='numeric'
            onChangeText={handleChange('rating')}
            onBlur={handleBlur('rating')}
            value={values.rating}
            style={styles.input}
          />
          {touched.rating && errors.rating && (
            <Text style={styles.error}>{errors.rating}</Text>
          )}

          <TextInput
            placeholder='Review'
            onChangeText={handleChange('text')}
            onBlur={handleBlur('text')}
            value={values.text}
            multiline
            style={[styles.input, styles.multiline]}
          />

          <Button onPress={handleSubmit} title='Create a review' />
        </View>
      )}
    </Formik>
  );
};

export default ReviewForm;
