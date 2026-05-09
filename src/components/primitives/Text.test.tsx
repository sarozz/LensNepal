import { render } from '@testing-library/react-native';
import type { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { i18n } from '@/i18n';
import { lightTheme } from '@/theme';
import { Text } from './Text';

const wrap = ({ children }: { children: ReactNode }) => (
  <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
);

describe('Text', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en');
  });

  it('renders its children', () => {
    const { getByText } = render(<Text>hello world</Text>, { wrapper: wrap });
    expect(getByText('hello world')).toBeTruthy();
  });

  it('uses Latin sizing when language is en', () => {
    const { getByText } = render(<Text variant="title1">title</Text>, { wrapper: wrap });
    const node = getByText('title');
    const expected = lightTheme.typography.title1.latin;
    expect(node.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          fontSize: expected.fontSize,
          lineHeight: expected.lineHeight,
          letterSpacing: expected.letterSpacing,
        }),
      ]),
    );
  });

  it('switches to Devanagari sizing when language is ne', async () => {
    await i18n.changeLanguage('ne');
    const { getByText } = render(<Text variant="title1">title</Text>, { wrapper: wrap });
    const node = getByText('title');
    const expected = lightTheme.typography.title1.devanagari;
    expect(node.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          fontSize: expected.fontSize,
          lineHeight: expected.lineHeight,
          letterSpacing: expected.letterSpacing,
        }),
      ]),
    );
  });

  it('applies the requested colour token', () => {
    const { getByText } = render(<Text color="accent">accent</Text>, { wrapper: wrap });
    expect(getByText('accent').props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ color: lightTheme.colors.accent })]),
    );
  });
});
