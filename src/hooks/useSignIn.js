import { useMutation } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/mutations';

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const credentials = { username, password };

    try {
      const response = await mutate({
        variables: { credentials },
      });
      console.log('Full response:', response);
      return response.data;
    } catch (error) {
      console.error('Error during sign-in:', error);
      throw error;
    }
  };

  return [signIn, result];
};

export default useSignIn;
