import { useMutation, useApolloClient } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/mutations';
import useAuthStorage from '../hooks/useAuthStorage';
import { useNavigate } from 'react-router-native';

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const signIn = async ({ username, password }) => {
    const credentials = { username, password };

    try {
      const response = await mutate({
        variables: { credentials },
      });

      const accessToken = response?.data?.authenticate?.accessToken;

      if (accessToken) {
        await authStorage.setAccessToken(accessToken);

        await apolloClient.resetStore();

        console.log('Signed in as ' + username);
        navigate('/');
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
