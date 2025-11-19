import { StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export function useRepositoriesStyles() {
	const { top } = useSafeAreaInsets()

	return StyleSheet.create({
		container: {
			flex: 1,
		},
		loadingContainer: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			paddingTop: top,
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
		},
	})
}
