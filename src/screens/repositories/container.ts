import { useTranslation } from 'react-i18next'
import { Alert, Linking } from 'react-native'
import { useGetRepositories } from '~/services/repository'

export function useRepositoriesContainer() {
	const { t } = useTranslation('repositories')

	const {
		data,
		isLoading,
		error,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useGetRepositories()

	const repositories = data?.pages.flatMap((page) => page ?? []) ?? []

	function handleOpenUrl(url: string) {
		return async function openUrl() {
			try {
				const supported = await Linking.canOpenURL(url)
				if (supported) {
					await Linking.openURL(url)
				} else {
					Alert.alert(t('errors.title'), t('errors.cannot_open_url'))
				}
			} catch {
				Alert.alert(t('errors.title'), t('errors.failed_to_open_url'))
			}
		}
	}

	function handleLoadMore() {
		if (hasNextPage && !isFetchingNextPage) {
			fetchNextPage()
		}
	}

	return {
		repositories,
		isLoading,
		error,
		handleOpenUrl,
		handleLoadMore,
		hasNextPage,
		isFetchingNextPage,
	}
}
