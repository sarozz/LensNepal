import { fireEvent, render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Pressable } from './Pressable';

describe('Pressable', () => {
  it('renders children and applies a default hit slop', () => {
    const { getByTestId } = render(
      <Pressable testID="press">
        <Text>tap</Text>
      </Pressable>,
    );
    const node = getByTestId('press');
    expect(node.props.hitSlop).toEqual({ top: 8, bottom: 8, left: 8, right: 8 });
  });

  it('calls onPress when fired', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <Pressable testID="press" onPress={onPress}>
        <Text>tap</Text>
      </Pressable>,
    );
    fireEvent.press(getByTestId('press'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('respects a caller-provided hit slop', () => {
    const { getByTestId } = render(
      <Pressable testID="press" hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}>
        <Text>tap</Text>
      </Pressable>,
    );
    expect(getByTestId('press').props.hitSlop).toEqual({
      top: 20,
      bottom: 20,
      left: 20,
      right: 20,
    });
  });
});
