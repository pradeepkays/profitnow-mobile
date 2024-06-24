import { LanguageCode } from '@vn.starlingTech/lang/language'
import { AppThemeType } from '@vn.starlingTech/store/baseStore'

const LANGUAGE: LanguageCode = 'en'
const THEME: AppThemeType = 'light'
const UI_WIDTH = 375

const settings: {
  LANGUAGE: LanguageCode
  VERSION_CONFIG: boolean
  THEME: AppThemeType
  UI_WIDTH: number
  LIST_SIZE: number
} = {
  LANGUAGE,
  VERSION_CONFIG: false,
  THEME,
  UI_WIDTH,
  LIST_SIZE: 15,
}

export default settings
