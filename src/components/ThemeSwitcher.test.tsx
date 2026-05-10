import { fireEvent, render } from '@testing-library/react-native';
import type { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { UnistylesRuntime } from 'react-native-unistyles';
import { i18n } from '@/i18n';
import { clear } from '@/lib/storage';
import { ThemeSwitcher } from './ThemeSwitcher';

const mocked = jest.mocked(UnistylesRuntime);

const wrap = ({ children }: { children: ReactNode }) => (
  <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
);

describe('ThemeSwitcher', () => {
  beforeEach(() => {
    clear();
    mocked.setTheme.mockClear();
    mocked.setAdaptiveThemes.mockClear();
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

  it('switches mode and applies the theme via UnistylesRuntime when tapped', () => {
    const { getByLabelText } = render(<ThemeSwitcher />, { wrapper: wrap });
    fireEvent.press(getByLabelText('Outdoor'));
    expect(mocked.setAdaptiveThemes).toHaveBeenLastCalledWith(false);
    expect(mocked.setTheme).toHaveBeenLastCalledWith('outdoorBright');
  });

  it('re-enables adaptive when System is tapped after a manual choice', () => {
    const { getByLabelText } = render(<ThemeSwitcher />, { wrapper: wrap });
    fireEvent.press(getByLabelText('Dark'));
    fireEvent.press(getByLabelText('System'));
    expect(mocked.setAdaptiveThemes).toHaveBeenLastCalledWith(true);
  });
});
