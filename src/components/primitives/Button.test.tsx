import { fireEvent, render } from '@testing-library/react-native';
import type { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { i18n } from '@/i18n';
import { lightTheme } from '@/theme';
import { Button } from './Button';

const wrap = ({ children }: { children: ReactNode }) => (
  <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
);

describe('Button', () => {
  it('renders the label', () => {
    const { getByText } = render(<Button label="Tap me" onPress={() => {}} />, {
      wrapper: wrap,
    });
    expect(getByText('Tap me')).toBeTruthy();
  });

  it('fires onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByRole } = render(<Button label="Tap me" onPress={onPress} />, {
      wrapper: wrap,
    });
    fireEvent.press(getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders the label in the accent colour', () => {
    const { getByText } = render(<Button label="Tap me" onPress={() => {}} />, {
      wrapper: wrap,
    });
    const node = getByText('Tap me');
    expect(node.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ color: lightTheme.colors.accent })]),
    );
  });

  it('uses the explicit accessibility label when provided', () => {
    const { getByLabelText } = render(
      <Button label="×" onPress={() => {}} accessibilityLabel="Close" />,
      { wrapper: wrap },
    );
    expect(getByLabelText('Close')).toBeTruthy();
  });
});
