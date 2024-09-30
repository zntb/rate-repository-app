import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  form: { padding: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10 },
  error: { color: 'red', marginBottom: 10 },
});

const SignUpForm = () => {
  const [createUser] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is required')
      .min(5, 'Username must be at least 5 characters')
      .max(30, 'Username must be 30 characters or less'),
    password: Yup.string()
      .required('Password is required')
      .min(5, 'Password must be at least 5 characters')
      .max(50, 'Password must be 50 characters or less'),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Password confirmation is required'),
  });

  const onSubmit = async values => {
    const { username, password } = values;

    try {
      await createUser({ variables: { user: { username, password } } });

      await signIn({ username, password });

      navigate('/');
    } catch (error) {
      console.error('Error during sign-up:', error);
    }
  };

  return (
    <Formik
      initialValues={{ username: '', password: '', passwordConfirmation: '' }}
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
            placeholder='Username'
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
            value={values.username}
            style={styles.input}
          />
          {touched.username && errors.username && (
            <Text style={styles.error}>{errors.username}</Text>
          )}

          <TextInput
            placeholder='Password'
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            secureTextEntry
            style={styles.input}
          />
          {touched.password && errors.password && (
            <Text style={styles.error}>{errors.password}</Text>
          )}

          <TextInput
            placeholder='Password confirmation'
            onChangeText={handleChange('passwordConfirmation')}
            onBlur={handleBlur('passwordConfirmation')}
            value={values.passwordConfirmation}
            secureTextEntry
            style={styles.input}
          />
          {touched.passwordConfirmation && errors.passwordConfirmation && (
            <Text style={styles.error}>{errors.passwordConfirmation}</Text>
          )}

          <Button onPress={handleSubmit} title='Sign Up' />
        </View>
      )}
    </Formik>
  );
};

export default SignUpForm;
