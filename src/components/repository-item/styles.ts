import { StyleSheet } from 'react-native'
import { useThemeContext } from '~/providers/theme-provider'

export function useRepositoryItemStyles() {
	const { theme } = useThemeContext()

	return StyleSheet.create({
		repositoryItem: {
			padding: 16,
			borderBottomWidth: 1,
			borderBottomColor: theme.colors.border,
			backgroundColor: theme.colors.surface,
		},
		repositoryName: {
			fontSize: 18,
			fontWeight: 'bold',
			marginBottom: 4,
			color: theme.colors.text,
		},
		repositoryDescription: {
			fontSize: 14,
			color: theme.colors.textSecondary,
			marginBottom: 8,
		},
		repositoryMeta: {
			flexDirection: 'row',
			gap: 16,
			marginTop: 8,
		},
		metaItem: {
			flexDirection: 'row',
			alignItems: 'center',
			gap: 4,
		},
		metaText: {
			fontSize: 12,
			color: theme.colors.textSecondary,
		},
		languageBadge: {
			paddingHorizontal: 8,
			paddingVertical: 4,
			borderRadius: 4,
			backgroundColor: theme.colors.badgeBackground,
		},
		languageText: {
			fontSize: 12,
			fontWeight: '500',
			color: theme.colors.text,
		},
	})
}
