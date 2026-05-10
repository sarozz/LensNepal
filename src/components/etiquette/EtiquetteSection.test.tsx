import { render } from '@testing-library/react-native';
import type { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { i18n } from '@/i18n';
import { lightTheme } from '@/theme';
import { EtiquetteSection } from './EtiquetteSection';

const wrap = ({ children }: { children: ReactNode }) => (
  <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
);

describe('EtiquetteSection', () => {
  it('renders the title and body', () => {
    const { getByText } = render(
      <EtiquetteSection title="Footwear" body="Shoes come off at thresholds." />,
      { wrapper: wrap },
    );
    expect(getByText('Footwear')).toBeTruthy();
    expect(getByText('Shoes come off at thresholds.')).toBeTruthy();
  });

  it('paints a hairline divider when not last', () => {
    const { getByTestId } = render(<EtiquetteSection title="t" body="b" />, {
      wrapper: wrap,
    });
    const styles = getByTestId('etiquette-section').props.style as Array<Record<string, unknown>>;
    const merged = Object.assign({}, ...styles);
    expect(merged.borderBottomWidth).toBe(1);
    expect(merged.borderBottomColor).toBe(lightTheme.colors.border);
  });

  it('omits the divider when isLast', () => {
    const { getByTestId } = render(<EtiquetteSection title="t" body="b" isLast />, {
      wrapper: wrap,
    });
    const styles = getByTestId('etiquette-section').props.style as Array<Record<string, unknown>>;
    const merged = Object.assign({}, ...styles);
    expect(merged).not.toHaveProperty('borderBottomWidth');
  });
});
