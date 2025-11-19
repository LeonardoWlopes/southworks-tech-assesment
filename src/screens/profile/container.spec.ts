import { renderHook } from '@testing-library/react-hooks'
import { Alert, Linking } from 'react-native'
import type { IOrganization } from '~/interfaces/organization'
import type { IUser } from '~/interfaces/user'
import { useGetOrganizations } from '~/services/organization'
import { useGetUser } from '~/services/user'
import { useProfileContainer } from './container'

jest.mock('../../services/user')
jest.mock('../../services/organization')
jest.mock('react-native', () => ({
	Alert: {
		alert: jest.fn(),
	},
	Linking: {
		canOpenURL: jest.fn(),
		openURL: jest.fn(),
	},
}))

const mockUseGetUser = useGetUser as jest.MockedFunction<typeof useGetUser>
const mockUseGetOrganizations = useGetOrganizations as jest.MockedFunction<
	typeof useGetOrganizations
>

describe('useContainer', () => {
	beforeEach(() => {
		jest.clearAllMocks()
		mockUseGetOrganizations.mockReturnValue({
			data: [],
			isLoading: false,
			error: null,
		} as unknown as ReturnType<typeof useGetOrganizations>)
	})

	it('should return data from useGetUser', () => {
		const mockData = {
			id: 1,
			login: 'test-user',
			name: 'Test User',
		} as IUser

		mockUseGetUser.mockReturnValue({
			data: mockData,
			isLoading: false,
			error: null,
		} as unknown as ReturnType<typeof useGetUser>)

		const { result } = renderHook(() => useProfileContainer())

		expect(result.current.data).toBe(mockData)
		expect(result.current.isLoading).toBe(false)
		expect(result.current.error).toBe(null)
	})

	it('should return loading state', () => {
		mockUseGetUser.mockReturnValue({
			data: null,
			isLoading: true,
			error: null,
		} as unknown as ReturnType<typeof useGetUser>)

		mockUseGetOrganizations.mockReturnValue({
			data: [],
			isLoading: false,
			error: null,
		} as unknown as ReturnType<typeof useGetOrganizations>)

		const { result } = renderHook(() => useProfileContainer())

		expect(result.current.isLoading).toBe(true)
	})

	it('should return loading state when organizations are loading', () => {
		mockUseGetUser.mockReturnValue({
			data: null,
			isLoading: false,
			error: null,
		} as unknown as ReturnType<typeof useGetUser>)

		mockUseGetOrganizations.mockReturnValue({
			data: [],
			isLoading: true,
			error: null,
		} as unknown as ReturnType<typeof useGetOrganizations>)

		const { result } = renderHook(() => useProfileContainer())

		expect(result.current.isLoading).toBe(true)
	})

	it('should return error state', () => {
		const mockError = new Error('Test error')

		mockUseGetUser.mockReturnValue({
			data: null,
			isLoading: false,
			error: mockError,
		} as unknown as ReturnType<typeof useGetUser>)

		mockUseGetOrganizations.mockReturnValue({
			data: [],
			isLoading: false,
			error: null,
		} as unknown as ReturnType<typeof useGetOrganizations>)

		const { result } = renderHook(() => useProfileContainer())

		expect(result.current.error).toBe(mockError)
	})

	it('should return error state when organizations fail', () => {
		const mockError = new Error('Organizations error')

		mockUseGetUser.mockReturnValue({
			data: null,
			isLoading: false,
			error: null,
		} as unknown as ReturnType<typeof useGetUser>)

		mockUseGetOrganizations.mockReturnValue({
			data: [],
			isLoading: false,
			error: mockError,
		} as unknown as ReturnType<typeof useGetOrganizations>)

		const { result } = renderHook(() => useProfileContainer())

		expect(result.current.error).toBe(mockError)
	})

	it('should return organizations data', () => {
		const mockOrganizations: IOrganization[] = [
			{
				id: 1,
				login: 'org1',
				node_id: 'node1',
				url: 'https://api.github.com/orgs/org1',
				repos_url: 'https://api.github.com/orgs/org1/repos',
				events_url: 'https://api.github.com/orgs/org1/events',
				hooks_url: 'https://api.github.com/orgs/org1/hooks',
				issues_url: 'https://api.github.com/orgs/org1/issues',
				members_url: 'https://api.github.com/orgs/org1/members',
				public_members_url:
					'https://api.github.com/orgs/org1/public_members',
				avatar_url: 'https://github.com/org1.png',
				description: 'Test org',
			},
		]

		mockUseGetUser.mockReturnValue({
			data: { id: 1 } as IUser,
			isLoading: false,
			error: null,
		} as unknown as ReturnType<typeof useGetUser>)

		mockUseGetOrganizations.mockReturnValue({
			data: mockOrganizations,
			isLoading: false,
			error: null,
		} as unknown as ReturnType<typeof useGetOrganizations>)

		const { result } = renderHook(() => useProfileContainer())

		expect(result.current.organizations).toEqual(mockOrganizations)
	})

	describe('formatNumber', () => {
		beforeEach(() => {
			mockUseGetUser.mockReturnValue({
				data: null,
				isLoading: false,
				error: null,
			} as unknown as ReturnType<typeof useGetUser>)
			mockUseGetOrganizations.mockReturnValue({
				data: [],
				isLoading: false,
				error: null,
			} as unknown as ReturnType<typeof useGetOrganizations>)
		})

		it('should format numbers in millions', () => {
			const { result } = renderHook(() => useProfileContainer())

			expect(result.current.formatNumber(1500000)).toBe('1.5M')
			expect(result.current.formatNumber(2000000)).toBe('2.0M')
		})

		it('should format numbers in thousands', () => {
			const { result } = renderHook(() => useProfileContainer())

			expect(result.current.formatNumber(1500)).toBe('1.5K')
			expect(result.current.formatNumber(2000)).toBe('2.0K')
		})

		it('should return string for small numbers', () => {
			const { result } = renderHook(() => useProfileContainer())

			expect(result.current.formatNumber(999)).toBe('999')
			expect(result.current.formatNumber(0)).toBe('0')
		})
	})

	describe('formatDate', () => {
		beforeEach(() => {
			mockUseGetUser.mockReturnValue({
				data: null,
				isLoading: false,
				error: null,
			} as unknown as ReturnType<typeof useGetUser>)
			mockUseGetOrganizations.mockReturnValue({
				data: [],
				isLoading: false,
				error: null,
			} as unknown as ReturnType<typeof useGetOrganizations>)
		})

		it('should format date in pt-BR locale', () => {
			const { result } = renderHook(() => useProfileContainer())

			const dateString = '2023-01-15T10:30:00Z'
			const formatted = result.current.formatDate(dateString)

			expect(formatted).toMatch(/\d{2}\/\d{2}\/\d{4}/)
		})
	})

	describe('handleOpenUrl', () => {
		beforeEach(() => {
			mockUseGetUser.mockReturnValue({
				data: null,
				isLoading: false,
				error: null,
			} as unknown as ReturnType<typeof useGetUser>)
			mockUseGetOrganizations.mockReturnValue({
				data: [],
				isLoading: false,
				error: null,
			} as unknown as ReturnType<typeof useGetOrganizations>)
		})

		it('should open URL when supported', async () => {
			const mockLinking = Linking as jest.Mocked<typeof Linking>
			mockLinking.canOpenURL.mockResolvedValue(true)
			mockLinking.openURL.mockResolvedValue(undefined)

			const { result } = renderHook(() => useProfileContainer())

			const testUrl = 'https://example.com'
			const openUrlFunction = result.current.handleOpenUrl(testUrl)

			await openUrlFunction()

			expect(mockLinking.canOpenURL).toHaveBeenCalledWith(testUrl)
			expect(mockLinking.openURL).toHaveBeenCalledWith(testUrl)
		})

		it('should show alert when URL is not supported', async () => {
			const mockLinking = Linking as jest.Mocked<typeof Linking>
			const mockAlert = Alert as jest.Mocked<typeof Alert>

			mockLinking.canOpenURL.mockResolvedValue(false)

			const { result } = renderHook(() => useProfileContainer())

			const testUrl = 'invalid://url'
			const openUrlFunction = result.current.handleOpenUrl(testUrl)

			await openUrlFunction()

			expect(mockLinking.canOpenURL).toHaveBeenCalledWith(testUrl)
			expect(mockLinking.openURL).not.toHaveBeenCalled()
			expect(mockAlert.alert).toHaveBeenCalledWith(
				'errors.title',
				'errors.cannot_open_url',
			)
		})

		it('should show alert when opening URL fails', async () => {
			const mockLinking = Linking as jest.Mocked<typeof Linking>
			const mockAlert = Alert as jest.Mocked<typeof Alert>

			mockLinking.canOpenURL.mockRejectedValue(new Error('Network error'))

			const { result } = renderHook(() => useProfileContainer())

			const testUrl = 'https://example.com'
			const openUrlFunction = result.current.handleOpenUrl(testUrl)

			await openUrlFunction()

			expect(mockLinking.canOpenURL).toHaveBeenCalledWith(testUrl)
			expect(mockAlert.alert).toHaveBeenCalledWith(
				'errors.title',
				'errors.failed_to_open_url',
			)
		})

		it('should show alert when openURL throws error', async () => {
			const mockLinking = Linking as jest.Mocked<typeof Linking>
			const mockAlert = Alert as jest.Mocked<typeof Alert>

			mockLinking.canOpenURL.mockResolvedValue(true)
			mockLinking.openURL.mockRejectedValue(new Error('Failed to open'))

			const { result } = renderHook(() => useProfileContainer())

			const testUrl = 'https://example.com'
			const openUrlFunction = result.current.handleOpenUrl(testUrl)

			await openUrlFunction()

			expect(mockLinking.canOpenURL).toHaveBeenCalledWith(testUrl)
			expect(mockLinking.openURL).toHaveBeenCalledWith(testUrl)
			expect(mockAlert.alert).toHaveBeenCalledWith(
				'errors.title',
				'errors.failed_to_open_url',
			)
		})
	})

	it('should return all expected functions and data', () => {
		mockUseGetUser.mockReturnValue({
			data: { id: 1 } as IUser,
			isLoading: false,
			error: null,
		} as unknown as ReturnType<typeof useGetUser>)

		mockUseGetOrganizations.mockReturnValue({
			data: [],
			isLoading: false,
			error: null,
		} as unknown as ReturnType<typeof useGetOrganizations>)

		const { result } = renderHook(() => useProfileContainer())

		expect(typeof result.current.handleOpenUrl).toBe('function')
		expect(typeof result.current.formatNumber).toBe('function')
		expect(typeof result.current.formatDate).toBe('function')
		expect(result.current.data).toBeDefined()
		expect(result.current.organizations).toBeDefined()
		expect(typeof result.current.isLoading).toBe('boolean')
	})
})
