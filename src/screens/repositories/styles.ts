import { StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export function useRepositoriesStyles() {
	const { top } = useSafeAreaInsets()

	return StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: 'white',
			paddingTop: top,
		},
		header: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			paddingHorizontal: 16,
			paddingVertical: 12,
			backgroundColor: 'white',
			borderBottomWidth: 1,
			borderBottomColor: 'rgba(0,0,0,0.1)',
		},
		headerLabel: {
			fontSize: 16,
			fontWeight: '500',
		},
		listContainer: {
			flex: 1,
			backgroundColor: 'white',
		},
		loadingContainer: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			paddingTop: top,
			backgroundColor: 'white',
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
			backgroundColor: 'white',
		},
	})
}
