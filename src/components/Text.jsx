import { Text as NativeText, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    fontSize: theme.fontSizes.body,
    color: theme.colors.textPrimary,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  bold: {
    fontWeight: theme.fontWeights.bold,
  },
  subheading: {
    fontSize: theme.fontSizes.subheading,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
});

const Text = ({ children, color, fontSize, fontWeight, style, ...props }) => {
  const textStyle = [
    styles.text,
    fontWeight === 'bold' && styles.bold,
    fontSize === 'subheading' && styles.subheading,
    color === 'textSecondary' && styles.colorTextSecondary,
    style,
  ];

  return (
    <NativeText style={textStyle} {...props}>
      {children}
    </NativeText>
  );
};

export default Text;
