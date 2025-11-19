import { FlashList } from '@shopify/flash-list'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import { RepositoryItem } from '~/components/repository-item'
import type { IRepository } from '~/interfaces/repository'
import { DEFAULT_TOUCHABLE_OPACITY_PROPS } from '~/utils/props'
import { useRepositoriesContainer } from './container'
import { useRepositoriesStyles } from './styles'

export function RepositoriesScreen() {
	const styles = useRepositoriesStyles()

	const { t } = useTranslation('repositories')

	const {
		repositories,
		isLoading,
		error,
		handleOpenUrl,
		handleLoadMore,
		isFetchingNextPage,
	} = useRepositoriesContainer()

	if (isLoading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color="#007AFF" />
				<Text style={{ marginTop: 15, fontSize: 16 }}>
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
						color: 'red',
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
				<Text style={{ fontSize: 16, textAlign: 'center' }}>
					{t('empty')}
				</Text>
			</View>
		)
	}

	return (
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
			onEndReached={handleLoadMore}
			onEndReachedThreshold={0.5}
			ListFooterComponent={
				isFetchingNextPage ? (
					<View style={styles.loadingMore}>
						<ActivityIndicator size="small" color="#007AFF" />
					</View>
				) : null
			}
		/>
	)
}
