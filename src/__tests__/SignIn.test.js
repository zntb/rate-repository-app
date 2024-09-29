import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { SignInContainer } from '../components/SignInContainer';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const mockOnSubmit = jest.fn();

      const { getByPlaceholderText, getByText } = render(
        <SignInContainer onSubmit={mockOnSubmit} />,
      );

      const usernameInput = getByPlaceholderText('Username');
      const passwordInput = getByPlaceholderText('Password');
      const submitButton = getByText('Sign in');

      fireEvent.changeText(usernameInput, 'testuser');
      fireEvent.changeText(passwordInput, 'password123');

      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledTimes(1);

        expect(mockOnSubmit.mock.calls[0][0]).toEqual({
          username: 'testuser',
          password: 'password123',
        });
      });
    });
  });
});
