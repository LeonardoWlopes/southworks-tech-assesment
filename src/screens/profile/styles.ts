import { StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export function useLoginStyles() {
	const { top } = useSafeAreaInsets()

	return StyleSheet.create({
		container: {
			flex: 1,
			padding: 20,
		},
		loadingContainer: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			paddingTop: top,
		},
		scrollContainer: {
			flexGrow: 1,
			paddingTop: top,
		},
		header: {
			alignItems: 'center',
			marginBottom: 30,
		},
		avatar: {
			width: 100,
			height: 100,
			borderRadius: 50,
			marginBottom: 15,
		},
		userName: {
			fontSize: 24,
			fontWeight: 'bold',
			textAlign: 'center',
			marginBottom: 5,
		},
		userLogin: {
			fontSize: 16,
			opacity: 0.7,
			textAlign: 'center',
		},
		description: {
			fontSize: 16,
			textAlign: 'center',
			marginVertical: 15,
			lineHeight: 22,
		},
		infoSection: {
			marginTop: 20,
			flex: 1,
		},
		infoRow: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			paddingVertical: 12,
			paddingHorizontal: 15,
			marginVertical: 2,
			borderRadius: 8,
			backgroundColor: 'rgba(0,0,0,0.05)',
		},
		infoLabel: {
			fontSize: 16,
			fontWeight: '500',
		},
		infoValue: {
			fontSize: 16,
			fontWeight: 'bold',
		},
		statsContainer: {
			flexDirection: 'row',
			justifyContent: 'space-around',
			marginTop: 25,
			paddingVertical: 20,
			borderRadius: 12,
			backgroundColor: 'rgba(0,0,0,0.03)',
		},
		statItem: {
			alignItems: 'center',
		},
		statNumber: {
			fontSize: 20,
			fontWeight: 'bold',
			marginBottom: 5,
		},
		statLabel: {
			fontSize: 12,
			opacity: 0.7,
			textAlign: 'center',
		},
		linkSection: {
			marginTop: 25,
		},
		linkButton: {
			backgroundColor: '#007AFF',
			paddingVertical: 12,
			paddingHorizontal: 20,
			borderRadius: 8,
			marginVertical: 5,
		},
		linkButtonText: {
			color: 'white',
			fontSize: 16,
			fontWeight: '500',
			textAlign: 'center',
		},
	})
}
