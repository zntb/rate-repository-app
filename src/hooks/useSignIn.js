import { useMutation } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/mutations';
import AuthStorage from '../utils/authStorage';

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);
  const authStorage = new AuthStorage();

  const signIn = async ({ username, password }) => {
    const credentials = { username, password };

    try {
      const response = await mutate({
        variables: { credentials },
      });

      const accessToken = response?.data?.authenticate?.accessToken;

      if (accessToken) {
        await authStorage.setAccessToken(accessToken);
        console.log('Access token saved successfully:', accessToken);
      }

      return response?.data;
    } catch (error) {
      console.error('Error during sign-in:', error);
      throw error;
    }
  };

  return [signIn, result];
};

export default useSignIn;
