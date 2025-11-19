import { MaterialIcons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { useThemeContext } from '~/providers/theme-provider'

export default function TabsLayout() {
	const { t } = useTranslation('tabs')
	const { theme } = useThemeContext()

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: theme.colors.primary,
				tabBarInactiveTintColor: theme.colors.textSecondary,
				tabBarStyle: {
					backgroundColor: theme.colors.surface,
					borderTopColor: theme.colors.border,
				},
			}}
			initialRouteName="profile"
		>
			<Tabs.Screen
				name="profile"
				options={{
					title: t('profile'),
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons
							name="person"
							size={size}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="repositories"
				options={{
					title: t('repositories'),
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name="code" size={size} color={color} />
					),
				}}
			/>
		</Tabs>
	)
}
