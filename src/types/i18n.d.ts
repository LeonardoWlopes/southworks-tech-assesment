import 'i18next'
import type ptBR from '~/i18n/languages/pt-br.json'

declare module 'i18next' {
	interface CustomTypeOptions {
		defaultNS: 'translation'
		resources: typeof ptBR
	}
}
