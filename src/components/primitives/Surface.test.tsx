import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { TestWrapper } from '@/test-utils';
import { lightTheme } from '@/theme';
import { Surface } from './Surface';

describe('Surface', () => {
  it('applies the requested background colour', () => {
    const { getByTestId } = render(
      <Surface testID="surface" background="bg">
        <Text>x</Text>
      </Surface>,
      { wrapper: TestWrapper },
    );
    expect(getByTestId('surface').props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ backgroundColor: lightTheme.colors.bg })]),
    );
  });

  it('applies shadow elevation values from the theme', () => {
    const { getByTestId } = render(
      <Surface testID="surface" elevation="level3">
        <Text>x</Text>
      </Surface>,
      { wrapper: TestWrapper },
    );
    const expected = lightTheme.elevation.level3;
    if (expected.kind !== 'shadow') {
      throw new Error('expected shadow elevation in light theme');
    }
    expect(getByTestId('surface').props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          shadowOpacity: expected.shadowOpacity,
          shadowRadius: expected.shadowRadius,
        }),
      ]),
    );
  });

  it('resolves padding through the spacing scale', () => {
    const { getByTestId } = render(
      <Surface testID="surface" padding="lg">
        <Text>x</Text>
      </Surface>,
      { wrapper: TestWrapper },
    );
    expect(getByTestId('surface').props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ padding: lightTheme.spacing.lg })]),
    );
  });
});
