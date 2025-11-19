import { StyleSheet } from 'react-native'

export function useRepositoryItemStyles() {
	return StyleSheet.create({
		repositoryItem: {
			padding: 16,
			borderBottomWidth: 1,
			borderBottomColor: 'rgba(0,0,0,0.1)',
			backgroundColor: 'white',
		},
		repositoryName: {
			fontSize: 18,
			fontWeight: 'bold',
			marginBottom: 4,
		},
		repositoryDescription: {
			fontSize: 14,
			color: '#666',
			marginBottom: 8,
		},
		repositoryMeta: {
			flexDirection: 'row',
			gap: 16,
			marginTop: 8,
		},
		metaItem: {
			flexDirection: 'row',
			alignItems: 'center',
			gap: 4,
		},
		metaText: {
			fontSize: 12,
			color: '#666',
		},
		languageBadge: {
			paddingHorizontal: 8,
			paddingVertical: 4,
			borderRadius: 4,
			backgroundColor: 'rgba(0,0,0,0.05)',
		},
		languageText: {
			fontSize: 12,
			fontWeight: '500',
		},
	})
}

