import { render } from '@testing-library/react-native';
import { i18n } from '@/i18n';
import { TestWrapper } from '@/test-utils';
import { lightTheme } from '@/theme';
import { Text } from './Text';

describe('Text', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en');
  });

  it('renders its children', () => {
    const { getByText } = render(<Text>hello world</Text>, { wrapper: TestWrapper });
    expect(getByText('hello world')).toBeTruthy();
  });

  it('uses Latin sizing when language is en', () => {
    const { getByText } = render(<Text variant="title1">title</Text>, { wrapper: TestWrapper });
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
    const { getByText } = render(<Text variant="title1">title</Text>, { wrapper: TestWrapper });
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
    const { getByText } = render(<Text color="accent">accent</Text>, { wrapper: TestWrapper });
    expect(getByText('accent').props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ color: lightTheme.colors.accent })]),
    );
  });
});
