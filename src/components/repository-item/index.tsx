import { Text, View } from 'react-native'
import { useShallow } from 'zustand/react/shallow'
import { useAppStore } from '~/stores/app-store'
import { useRepositoryItemStyles } from './styles'
import type { IRepositoryItemProps } from './types'

export function RepositoryItem({ repository }: IRepositoryItemProps) {
	const styles = useRepositoryItemStyles()
	const { showRepositoryLanguage } = useAppStore(
		useShallow(({ showRepositoryLanguage }) => ({
			showRepositoryLanguage,
		})),
	)

	return (
		<View style={styles.repositoryItem}>
			<Text style={styles.repositoryName}>{repository.name}</Text>

			{repository.description && (
				<Text style={styles.repositoryDescription} numberOfLines={2}>
					{repository.description}
				</Text>
			)}

			<View style={styles.repositoryMeta}>
				{showRepositoryLanguage && repository.language && (
					<View style={styles.languageBadge}>
						<Text style={styles.languageText}>
							{repository.language}
						</Text>
					</View>
				)}

				<View style={styles.metaItem}>
					<Text style={styles.metaText}>
						⭐ {repository.stargazers_count}
					</Text>
				</View>

				<View style={styles.metaItem}>
					<Text style={styles.metaText}>
						🍴 {repository.forks_count}
					</Text>
				</View>
			</View>
		</View>
	)
}
