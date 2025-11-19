import { MaterialIcons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { useTranslation } from 'react-i18next'

export default function TabsLayout() {
	const { t } = useTranslation('tabs')

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: '#007AFF',
				tabBarInactiveTintColor: '#8E8E93',
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
				name="home"
				options={{
					title: t('home'),
					tabBarIcon: ({ color, size }) => (
						<MaterialIcons name="home" size={size} color={color} />
					),
				}}
			/>
		</Tabs>
	)
}
