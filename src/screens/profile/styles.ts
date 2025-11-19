import { StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useThemeContext } from '~/providers/theme-provider'

export function useLoginStyles() {
	const { top } = useSafeAreaInsets()
	const { theme } = useThemeContext()

	return StyleSheet.create({
		container: {
			flex: 1,
			padding: 20,
			backgroundColor: theme.colors.background,
		},
		loadingContainer: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			paddingTop: top,
			backgroundColor: theme.colors.background,
		},
		scrollContainer: {
			flexGrow: 1,
			paddingTop: top,
		},
		header: {
			alignItems: 'center',
			marginBottom: 30,
		},
		themeToggleContainer: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			paddingVertical: 12,
			paddingHorizontal: 15,
			marginBottom: 20,
			borderRadius: 8,
			backgroundColor: theme.colors.cardBackground,
		},
		themeToggleLabel: {
			fontSize: 16,
			fontWeight: '500',
			color: theme.colors.text,
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
			color: theme.colors.text,
		},
		userLogin: {
			fontSize: 16,
			textAlign: 'center',
			color: theme.colors.textTertiary,
		},
		description: {
			fontSize: 16,
			textAlign: 'center',
			marginVertical: 15,
			lineHeight: 22,
			color: theme.colors.text,
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
			backgroundColor: theme.colors.cardBackground,
		},
		infoLabel: {
			fontSize: 16,
			fontWeight: '500',
			color: theme.colors.text,
		},
		infoValue: {
			fontSize: 16,
			fontWeight: 'bold',
			color: theme.colors.text,
		},
		statsContainer: {
			flexDirection: 'row',
			justifyContent: 'space-around',
			marginTop: 25,
			paddingVertical: 20,
			borderRadius: 12,
			backgroundColor: theme.colors.cardBackgroundLight,
		},
		statItem: {
			alignItems: 'center',
		},
		statNumber: {
			fontSize: 20,
			fontWeight: 'bold',
			marginBottom: 5,
			color: theme.colors.text,
		},
		statLabel: {
			fontSize: 12,
			textAlign: 'center',
			color: theme.colors.textTertiary,
		},
		linkSection: {
			marginTop: 25,
		},
		linkButton: {
			backgroundColor: theme.colors.primary,
			paddingVertical: 12,
			paddingHorizontal: 20,
			borderRadius: 8,
			marginVertical: 5,
		},
		linkButtonText: {
			color: theme.colors.surface,
			fontSize: 16,
			fontWeight: '500',
			textAlign: 'center',
		},
	})
}
