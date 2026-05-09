import '@testing-library/react-native';

jest.mock('react-native-unistyles', () => {
  const themes = jest.requireActual('@/theme/themes');
  return {
    StyleSheet: {
      configure: jest.fn(),
      create: (input: unknown) => input,
    },
    useUnistyles: () => ({ theme: themes.lightTheme, rt: {} }),
  };
});
