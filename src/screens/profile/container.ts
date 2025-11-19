import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useTranslation } from 'react-i18next'
import { Alert, Linking } from 'react-native'
import { useGetUser } from '~/services/user'

export function useProfileContainer() {
	const { data, isLoading, error } = useGetUser()
	const { t } = useTranslation('profile')

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

	function formatNumber(num: number) {
		if (num >= 1000000) {
			return `${(num / 1000000).toFixed(1)}M`
		}
		if (num >= 1000) {
			return `${(num / 1000).toFixed(1)}K`
		}
		return num.toString()
	}

	function formatDate(dateString: string) {
		return format(new Date(dateString), 'dd/MM/yyyy', { locale: ptBR })
	}

	return {
		data,
		isLoading,
		error,
		handleOpenUrl,
		formatNumber,
		formatDate,
	}
}
