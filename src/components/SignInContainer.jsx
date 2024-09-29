import { View } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import Button from './Button';
import FormikTextInput from './FormikTextInput';

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

export const SignInContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View>
          <FormikTextInput name='username' placeholder='Username' />
          <FormikTextInput
            name='password'
            placeholder='Password'
            secureTextEntry
          />
          <Button onPress={handleSubmit}>Sign in</Button>
        </View>
      )}
    </Formik>
  );
};
