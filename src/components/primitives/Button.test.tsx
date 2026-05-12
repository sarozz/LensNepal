import { fireEvent, render } from '@testing-library/react-native';
import { TestWrapper } from '@/test-utils';
import { lightTheme } from '@/theme';
import { Button } from './Button';

describe('Button', () => {
  it('renders the label', () => {
    const { getByText } = render(<Button label="Tap me" onPress={() => {}} />, {
      wrapper: TestWrapper,
    });
    expect(getByText('Tap me')).toBeTruthy();
  });

  it('fires onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByRole } = render(<Button label="Tap me" onPress={onPress} />, {
      wrapper: TestWrapper,
    });
    fireEvent.press(getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders the label in the accent colour', () => {
    const { getByText } = render(<Button label="Tap me" onPress={() => {}} />, {
      wrapper: TestWrapper,
    });
    const node = getByText('Tap me');
    expect(node.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ color: lightTheme.colors.accent })]),
    );
  });

  it('uses the explicit accessibility label when provided', () => {
    const { getByLabelText } = render(
      <Button label="×" onPress={() => {}} accessibilityLabel="Close" />,
      { wrapper: TestWrapper },
    );
    expect(getByLabelText('Close')).toBeTruthy();
  });
});
