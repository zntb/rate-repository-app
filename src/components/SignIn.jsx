import React from 'react';
import { View, StyleSheet, TextInput, Button } from 'react-native';
import { Formik } from 'formik';

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#0366d6',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

const SignIn = () => {
  const onSubmit = values => {
    console.log(values);
  };

  return (
    <Formik initialValues={{ username: '', password: '' }} onSubmit={onSubmit}>
      {({ handleChange, handleSubmit, values }) => (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder='Username'
            value={values.username}
            onChangeText={handleChange('username')}
          />
          <TextInput
            style={styles.input}
            placeholder='Password'
            secureTextEntry
            value={values.password}
            onChangeText={handleChange('password')}
          />
          <Button onPress={handleSubmit} title='Sign in' />
        </View>
      )}
    </Formik>
  );
};

export default SignIn;
