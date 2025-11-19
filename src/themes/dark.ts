import { EFont } from '~/enums/fonts'
import type { ITheme } from '~/interfaces/theme'

export const darkTheme: ITheme = {
	colors: {
		background: '#101417',
		surface: '#1a1d21',
		primary: '#0a84ff',
		text: '#ffffff',
		textSecondary: '#a0a0a0',
		textTertiary: 'rgba(255,255,255,0.7)',
		border: 'rgba(255,255,255,0.1)',
		error: '#ff453a',
		cardBackground: 'rgba(255,255,255,0.1)',
		cardBackgroundLight: 'rgba(255,255,255,0.05)',
		badgeBackground: 'rgba(255,255,255,0.1)',
	},
	fonts: EFont,
}
