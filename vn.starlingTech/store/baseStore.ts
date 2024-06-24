import { createWithEqualityFn } from 'zustand/traditional'

import settings from '@vn.starlingTech/config/settings'
import {
  colorDark,
  colorDefault,
  ColorScheme,
} from '@vn.starlingTech/theme/theming'

export type AppThemeType = 'auto' | 'dark' | 'light'

type AppState = {
  theme: AppThemeType
  color: ColorScheme
  dispatchTheme: (p: AppThemeType, currentColor?: 'dark' | 'light') => void
}

export const useAppBaseStore = createWithEqualityFn<AppState>(
  (set) => ({
    theme: settings.THEME,
    color: colorDefault,
    dispatchTheme: (theme, currentColor) => {
      const temp = currentColor ?? theme
      const _color = temp === 'dark' ? colorDark : colorDefault
      set({ theme, color: _color })
    },
  }),
  Object.is,
)
