import { FlashList } from '@shopify/flash-list'
import { useTranslation } from 'react-i18next'
import {
	ActivityIndicator,
	RefreshControl,
	Switch,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import { RepositoryItem } from '~/components/repository-item'
import type { IRepository } from '~/interfaces/repository'
import { useThemeContext } from '~/providers/theme-provider'
import { useAppStore } from '~/stores/app-store'
import { DEFAULT_TOUCHABLE_OPACITY_PROPS } from '~/utils/props'
import { useRepositoriesContainer } from './container'
import { useRepositoriesStyles } from './styles'

export function RepositoriesScreen() {
	const styles = useRepositoriesStyles()

	const { theme } = useThemeContext()

	const { t } = useTranslation('repositories')

	const { showRepositoryLanguage, set: setAppStore } = useAppStore()

	const {
		repositories,
		isLoading,
		error,
		handleOpenUrl,
		handleLoadMore,
		refetch,
		isFetchingNextPage,
		isRefetching,
	} = useRepositoriesContainer()

	if (isLoading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color={theme.colors.primary} />
				<Text
					style={{
						marginTop: 15,
						fontSize: 16,
						color: theme.colors.text,
					}}
				>
					{t('loading')}
				</Text>
			</View>
		)
	}

	if (error) {
		return (
			<View style={styles.loadingContainer}>
				<Text
					style={{
						fontSize: 18,
						color: theme.colors.error,
						textAlign: 'center',
					}}
				>
					{t('error')}
				</Text>
				<Text
					style={{
						fontSize: 14,
						marginTop: 10,
						textAlign: 'center',
						color: theme.colors.text,
					}}
				>
					{error.message}
				</Text>
			</View>
		)
	}

	if (repositories.length === 0) {
		return (
			<View style={styles.emptyContainer}>
				<Text
					style={{
						fontSize: 16,
						textAlign: 'center',
						color: theme.colors.text,
					}}
				>
					{t('empty')}
				</Text>
			</View>
		)
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerLabel}>
					{t('header.show_language')}
				</Text>

				<Switch
					value={showRepositoryLanguage}
					onValueChange={(value) =>
						setAppStore({ showRepositoryLanguage: value })
					}
				/>
			</View>

			<FlashList<IRepository>
				data={repositories}
				renderItem={({ item }) => (
					<TouchableOpacity
						{...DEFAULT_TOUCHABLE_OPACITY_PROPS}
						onPress={handleOpenUrl(item.html_url)}
					>
						<RepositoryItem repository={item} />
					</TouchableOpacity>
				)}
				keyExtractor={(item) => item.id.toString()}
				style={styles.listContainer}
				contentContainerStyle={{ paddingBottom: 16 }}
				onEndReached={handleLoadMore}
				onEndReachedThreshold={0.5}
				refreshControl={
					<RefreshControl
						refreshing={isRefetching}
						onRefresh={refetch}
						tintColor={theme.colors.primary}
					/>
				}
				ListFooterComponent={
					isFetchingNextPage ? (
						<View style={styles.loadingMore}>
							<ActivityIndicator
								size="small"
								color={theme.colors.primary}
							/>
						</View>
					) : null
				}
			/>
		</View>
	)
}
