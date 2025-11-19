import AsyncStorage from '@react-native-async-storage/async-storage'
import { zustandStorage } from '~/utils/storage'

jest.mock('@react-native-async-storage/async-storage', () => ({
	setItem: jest.fn(),
	getItem: jest.fn(),
	removeItem: jest.fn(),
}))

describe('zustandStorage', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('should set an item', async () => {
		const name = 'testKey'
		const value = 'testValue'
		await zustandStorage.setItem(name, value)
		expect(AsyncStorage.setItem).toHaveBeenCalledWith(name, value)
	})

	it('should get an item', async () => {
		const name = 'testKey'
		const value = 'testValue'
		;(AsyncStorage.getItem as jest.Mock).mockResolvedValue(value)
		const result = await zustandStorage.getItem(name)
		expect(AsyncStorage.getItem).toHaveBeenCalledWith(name)
		expect(result).toBe(value)
	})

	it('should return null if item does not exist', async () => {
		const name = 'testKey'
		;(AsyncStorage.getItem as jest.Mock).mockResolvedValue(null)
		const result = await zustandStorage.getItem(name)
		expect(AsyncStorage.getItem).toHaveBeenCalledWith(name)
		expect(result).toBeNull()
	})

	it('should remove an item', async () => {
		const name = 'testKey'
		await zustandStorage.removeItem(name)
		expect(AsyncStorage.removeItem).toHaveBeenCalledWith(name)
	})
})
