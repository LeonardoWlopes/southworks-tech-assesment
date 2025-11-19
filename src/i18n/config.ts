import { getLocales } from 'expo-localization'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { messageLogger } from '~/utils/log'
import en from './languages/en.json'
import ptBr from './languages/pt-br.json'

const DEFAULT_LANGUAGE = 'en'

const lng = getLocales()[0]?.languageTag || DEFAULT_LANGUAGE

i18n.use(initReactI18next).init({
	compatibilityJSON: 'v4',
	resources: {
		en,
		'pt-BR': ptBr,
	},
	fallbackLng: DEFAULT_LANGUAGE,
	lng,
	interpolation: {
		escapeValue: false,
	},
})

messageLogger(`🌎 Setting language to ${lng}`)

export const t = i18n.t.bind(i18n)
