import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { lightTheme } from '@/theme';
import { Stack } from './Stack';

describe('Stack', () => {
  it('applies the requested direction', () => {
    const { getByTestId } = render(
      <Stack testID="stack" direction="row">
        <Text>x</Text>
      </Stack>,
    );
    expect(getByTestId('stack').props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ flexDirection: 'row' })]),
    );
  });

  it('resolves gap through the spacing scale', () => {
    const { getByTestId } = render(
      <Stack testID="stack" gap="md">
        <Text>x</Text>
      </Stack>,
    );
    expect(getByTestId('stack').props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ gap: lightTheme.spacing.md })]),
    );
  });

  it('omits unset optional style fields entirely', () => {
    const { getByTestId } = render(
      <Stack testID="stack">
        <Text>x</Text>
      </Stack>,
    );
    const styles = getByTestId('stack').props.style as Array<Record<string, unknown>>;
    const merged = Object.assign({}, ...styles);
    expect(merged).not.toHaveProperty('gap');
    expect(merged).not.toHaveProperty('alignItems');
    expect(merged).not.toHaveProperty('justifyContent');
    expect(merged).not.toHaveProperty('padding');
  });
});
