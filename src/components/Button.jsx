import { Pressable, View, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    minWidth: 64,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.roundness,
  },
  text: {
    color: 'white',
  },
});

const Button = ({ children, style, type = 'default', ...props }) => {
  const getBackgroundColor = type => {
    switch (type) {
      case 'alertButton':
        return 'red';
      default:
        return theme.colors.primary;
    }
  };

  const buttonStyle = [
    styles.container,
    { backgroundColor: getBackgroundColor(type) },
    style,
  ];

  return (
    <Pressable {...props}>
      <View style={buttonStyle}>
        <Text style={styles.text} fontWeight='bold'>
          {children}
        </Text>
      </View>
    </Pressable>
  );
};

export default Button;
