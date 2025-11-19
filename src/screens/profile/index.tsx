import { Image } from 'expo-image'
import { useTranslation } from 'react-i18next'
import {
	ActivityIndicator,
	ScrollView,
	Switch,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import { ETheme } from '~/enums/theme'
import { useThemeContext } from '~/providers/theme-provider'
import { DEFAULT_TOUCHABLE_OPACITY_PROPS } from '~/utils/props'
import { useProfileContainer } from './container'
import { useLoginStyles } from './styles'

export function ProfileScreen() {
	const {
		data,
		isLoading,
		error,
		organizations,
		handleOpenUrl,
		formatNumber,
		formatDate,
	} = useProfileContainer()

	const { t } = useTranslation('profile')

	const { theme, toggleTheme, themeMode } = useThemeContext()

	const styles = useLoginStyles()

	const isDarkMode = themeMode === ETheme.DARK

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

	if (!data) {
		return (
			<View style={styles.loadingContainer}>
				<Text
					style={{
						fontSize: 16,
						textAlign: 'center',
						color: theme.colors.text,
					}}
				>
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
			<View style={styles.themeToggleContainer}>
				<Text style={styles.themeToggleLabel}>
					{t('header.dark_mode')}
				</Text>
				<Switch
					value={isDarkMode}
					onValueChange={() => toggleTheme()}
				/>
			</View>

			<View style={styles.header}>
				<Image
					source={{ uri: data.avatar_url }}
					style={styles.avatar}
					contentFit="cover"
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

			{organizations && organizations.length > 0 && (
				<View style={styles.organizationsSection}>
					<Text style={styles.organizationsTitle}>
						{t('info.organizations')}
					</Text>
					<View style={styles.organizationsList}>
						{organizations.map((org) => (
							<TouchableOpacity
								key={org.id}
								{...DEFAULT_TOUCHABLE_OPACITY_PROPS}
								style={styles.organizationItem}
								onPress={handleOpenUrl(
									`https://github.com/${org.login}`,
								)}
							>
								<Image
									source={{ uri: org.avatar_url }}
									style={styles.organizationAvatar}
									contentFit="cover"
								/>
								<Text
									style={styles.organizationName}
									numberOfLines={2}
								>
									{org.login}
								</Text>
							</TouchableOpacity>
						))}
					</View>
				</View>
			)}

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
