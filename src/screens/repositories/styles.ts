import { StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useThemeContext } from '~/providers/theme-provider'

export function useRepositoriesStyles() {
	const { top } = useSafeAreaInsets()
	const { theme } = useThemeContext()

	return StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: theme.colors.surface,
			paddingTop: top,
		},
		header: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			paddingHorizontal: 16,
			paddingVertical: 12,
			backgroundColor: theme.colors.surface,
			borderBottomWidth: 1,
			borderBottomColor: theme.colors.border,
		},
		headerLabel: {
			fontSize: 16,
			fontWeight: '500',
			color: theme.colors.text,
		},
		listContainer: {
			flex: 1,
			backgroundColor: theme.colors.surface,
		},
		loadingContainer: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			paddingTop: top,
			backgroundColor: theme.colors.surface,
		},
		loadingMore: {
			padding: 16,
			alignItems: 'center',
		},
		emptyContainer: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			paddingTop: top,
			backgroundColor: theme.colors.surface,
		},
	})
}
