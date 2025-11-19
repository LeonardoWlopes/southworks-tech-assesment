import { useTranslation } from 'react-i18next'
import {
	ActivityIndicator,
	Image,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import { DEFAULT_TOUCHABLE_OPACITY_PROPS } from '~/utils/props'
import { useProfileContainer } from './container'
import { useLoginStyles } from './styles'

export function ProfileScreen() {
	const { data, isLoading, error, handleOpenUrl, formatNumber, formatDate } =
		useProfileContainer()
	const { t } = useTranslation('profile')

	const styles = useLoginStyles()

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

	if (!data) {
		return (
			<View style={styles.loadingContainer}>
				<Text style={{ fontSize: 16, textAlign: 'center' }}>
					{t('not_found')}
				</Text>
			</View>
		)
	}

	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={styles.scrollContainer}
			showsVerticalScrollIndicator={false}
		>
			<View style={styles.header}>
				<Image
					source={{ uri: data.avatar_url }}
					style={styles.avatar}
					resizeMode="cover"
				/>
				<Text style={styles.userName}>{data.name || data.login}</Text>
				<Text style={styles.userLogin}>@{data.login}</Text>
			</View>

			{data.bio && <Text style={styles.description}>{data.bio}</Text>}

			<View style={styles.statsContainer}>
				<View style={styles.statItem}>
					<Text style={styles.statNumber}>
						{formatNumber(data.public_repos)}
					</Text>
					<Text style={styles.statLabel}>
						{t('stats.public_repos')}
					</Text>
				</View>
				<View style={styles.statItem}>
					<Text style={styles.statNumber}>
						{formatNumber(data.followers)}
					</Text>
					<Text style={styles.statLabel}>{t('stats.followers')}</Text>
				</View>
				<View style={styles.statItem}>
					<Text style={styles.statNumber}>
						{formatNumber(data.following)}
					</Text>
					<Text style={styles.statLabel}>{t('stats.following')}</Text>
				</View>
				<View style={styles.statItem}>
					<Text style={styles.statNumber}>
						{formatNumber(data.public_gists)}
					</Text>
					<Text style={styles.statLabel}>
						{t('stats.public_gists')}
					</Text>
				</View>
			</View>

			<View style={styles.infoSection}>
				{data.company && (
					<View style={styles.infoRow}>
						<Text style={styles.infoLabel}>
							{t('info.company')}
						</Text>
						<Text style={styles.infoValue}>{data.company}</Text>
					</View>
				)}

				{data.location && (
					<View style={styles.infoRow}>
						<Text style={styles.infoLabel}>
							{t('info.location')}
						</Text>
						<Text style={styles.infoValue}>{data.location}</Text>
					</View>
				)}

				{data.email && (
					<View style={styles.infoRow}>
						<Text style={styles.infoLabel}>{t('info.email')}</Text>
						<Text style={styles.infoValue}>{data.email}</Text>
					</View>
				)}

				{data.twitter_username && (
					<View style={styles.infoRow}>
						<Text style={styles.infoLabel}>
							{t('info.twitter')}
						</Text>
						<Text style={styles.infoValue}>
							@{data.twitter_username}
						</Text>
					</View>
				)}

				<View style={styles.infoRow}>
					<Text style={styles.infoLabel}>{t('info.created_at')}</Text>
					<Text style={styles.infoValue}>
						{formatDate(data.created_at)}
					</Text>
				</View>

				<View style={styles.infoRow}>
					<Text style={styles.infoLabel}>{t('info.updated_at')}</Text>
					<Text style={styles.infoValue}>
						{formatDate(data.updated_at)}
					</Text>
				</View>
			</View>

			<View style={styles.linkSection}>
				<TouchableOpacity
					{...DEFAULT_TOUCHABLE_OPACITY_PROPS}
					style={styles.linkButton}
					onPress={handleOpenUrl(data.html_url)}
				>
					<Text style={styles.linkButtonText}>
						{t('links.view_github')}
					</Text>
				</TouchableOpacity>

				{data.blog && (
					<TouchableOpacity
						{...DEFAULT_TOUCHABLE_OPACITY_PROPS}
						style={styles.linkButton}
						onPress={handleOpenUrl(data.blog)}
					>
						<Text style={styles.linkButtonText}>
							{t('links.visit_blog')}
						</Text>
					</TouchableOpacity>
				)}
			</View>
		</ScrollView>
	)
}
