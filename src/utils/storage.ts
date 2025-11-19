import AsyncStorage from '@react-native-async-storage/async-storage'
import type { StateStorage } from 'zustand/middleware'

export const zustandStorage: StateStorage = {
	setItem: (name, value) => {
		return AsyncStorage.setItem(name, value)
	},
	getItem: (name) => {
		const value = AsyncStorage.getItem(name)

		return value ?? null
	},
	removeItem: (name) => {
		return AsyncStorage.removeItem(name)
	},
}
