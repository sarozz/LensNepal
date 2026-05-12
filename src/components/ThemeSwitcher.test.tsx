import { fireEvent, render, waitFor } from '@testing-library/react-native';
import type { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { i18n } from '@/i18n';
import { clear, getString } from '@/lib/storage';
import { ThemeProvider } from '@/theme';
import { ThemeSwitcher } from './ThemeSwitcher';

const wrap = ({ children }: { children: ReactNode }) => (
  <I18nextProvider i18n={i18n}>
    <ThemeProvider>{children}</ThemeProvider>
  </I18nextProvider>
);

describe('ThemeSwitcher', () => {
  beforeEach(async () => {
    await clear();
  });

  it('renders all four mode tiles', () => {
    const { getByLabelText } = render(<ThemeSwitcher />, { wrapper: wrap });
    expect(getByLabelText('System')).toBeTruthy();
    expect(getByLabelText('Light')).toBeTruthy();
    expect(getByLabelText('Dark')).toBeTruthy();
    expect(getByLabelText('Outdoor')).toBeTruthy();
  });

  it('marks the System tile as selected on a fresh install', () => {
    const { getByLabelText } = render(<ThemeSwitcher />, { wrapper: wrap });
    expect(getByLabelText('System').props.accessibilityState.selected).toBe(true);
    expect(getByLabelText('Light').props.accessibilityState.selected).toBe(false);
  });

  it('persists the chosen mode and marks it active when tapped', async () => {
    const { getByLabelText } = render(<ThemeSwitcher />, { wrapper: wrap });
    fireEvent.press(getByLabelText('Outdoor'));
    await waitFor(() => {
      expect(getByLabelText('Outdoor').props.accessibilityState.selected).toBe(true);
    });
    expect(await getString('preferredTheme')).toBe('outdoorBright');
  });

  it('clears persistence and switches active tile when System is tapped after a manual choice', async () => {
    const { getByLabelText } = render(<ThemeSwitcher />, { wrapper: wrap });
    fireEvent.press(getByLabelText('Dark'));
    await waitFor(() => {
      expect(getByLabelText('Dark').props.accessibilityState.selected).toBe(true);
    });
    fireEvent.press(getByLabelText('System'));
    await waitFor(() => {
      expect(getByLabelText('System').props.accessibilityState.selected).toBe(true);
    });
    expect(await getString('preferredTheme')).toBeUndefined();
  });
});
