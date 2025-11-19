import { renderHook } from '@testing-library/react-hooks'
import { Alert, Linking } from 'react-native'
import type { IRepository } from '~/interfaces/repository'
import { useGetRepositories } from '~/services/repository'
import { useRepositoriesContainer } from './container'

jest.mock('../../services/repository')
jest.mock('react-native', () => ({
	Alert: {
		alert: jest.fn(),
	},
	Linking: {
		canOpenURL: jest.fn(),
		openURL: jest.fn(),
	},
}))

const mockUseGetRepositories = useGetRepositories as jest.MockedFunction<
	typeof useGetRepositories
>

describe('useRepositoriesContainer', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('should return repositories from useGetRepositories', () => {
		const mockRepositories: IRepository[] = [
			{
				id: 1,
				name: 'repo-1',
				description: 'Test repository 1',
				language: 'TypeScript',
				stargazers_count: 10,
				forks_count: 5,
				html_url: 'https://github.com/user/repo-1',
			},
			{
				id: 2,
				name: 'repo-2',
				description: 'Test repository 2',
				language: 'JavaScript',
				stargazers_count: 20,
				forks_count: 8,
				html_url: 'https://github.com/user/repo-2',
			},
		]

		mockUseGetRepositories.mockReturnValue({
			data: {
				pages: [mockRepositories],
				pageParams: [1],
			},
			isLoading: false,
			error: null,
			fetchNextPage: jest.fn(),
			hasNextPage: false,
			isFetchingNextPage: false,
		} as unknown as ReturnType<typeof useGetRepositories>)

		const { result } = renderHook(() => useRepositoriesContainer())

		expect(result.current.repositories).toEqual(mockRepositories)
		expect(result.current.isLoading).toBe(false)
		expect(result.current.error).toBe(null)
	})

	it('should flatten multiple pages of repositories', () => {
		const page1: IRepository[] = [
			{
				id: 1,
				name: 'repo-1',
				description: 'Test repository 1',
				language: 'TypeScript',
				stargazers_count: 10,
				forks_count: 5,
				html_url: 'https://github.com/user/repo-1',
			},
		]

		const page2: IRepository[] = [
			{
				id: 2,
				name: 'repo-2',
				description: 'Test repository 2',
				language: 'JavaScript',
				stargazers_count: 20,
				forks_count: 8,
				html_url: 'https://github.com/user/repo-2',
			},
		]

		mockUseGetRepositories.mockReturnValue({
			data: {
				pages: [page1, page2],
				pageParams: [1, 2],
			},
			isLoading: false,
			error: null,
			fetchNextPage: jest.fn(),
			hasNextPage: true,
			isFetchingNextPage: false,
		} as unknown as ReturnType<typeof useGetRepositories>)

		const { result } = renderHook(() => useRepositoriesContainer())

		expect(result.current.repositories).toHaveLength(2)
		expect(result.current.repositories[0]).toEqual(page1[0])
		expect(result.current.repositories[1]).toEqual(page2[0])
	})

	it('should return loading state', () => {
		mockUseGetRepositories.mockReturnValue({
			data: undefined,
			isLoading: true,
			error: null,
			fetchNextPage: jest.fn(),
			hasNextPage: false,
			isFetchingNextPage: false,
		} as unknown as ReturnType<typeof useGetRepositories>)

		const { result } = renderHook(() => useRepositoriesContainer())

		expect(result.current.isLoading).toBe(true)
		expect(result.current.repositories).toEqual([])
	})

	it('should return error state', () => {
		const mockError = new Error('Failed to fetch repositories')

		mockUseGetRepositories.mockReturnValue({
			data: undefined,
			isLoading: false,
			error: mockError,
			fetchNextPage: jest.fn(),
			hasNextPage: false,
			isFetchingNextPage: false,
		} as unknown as ReturnType<typeof useGetRepositories>)

		const { result } = renderHook(() => useRepositoriesContainer())

		expect(result.current.error).toBe(mockError)
		expect(result.current.isLoading).toBe(false)
	})

	it('should handle load more when hasNextPage is true', () => {
		const mockFetchNextPage = jest.fn()

		mockUseGetRepositories.mockReturnValue({
			data: {
				pages: [[]],
				pageParams: [1],
			},
			isLoading: false,
			error: null,
			fetchNextPage: mockFetchNextPage,
			hasNextPage: true,
			isFetchingNextPage: false,
		} as unknown as ReturnType<typeof useGetRepositories>)

		const { result } = renderHook(() => useRepositoriesContainer())

		result.current.handleLoadMore()

		expect(mockFetchNextPage).toHaveBeenCalledTimes(1)
	})

	it('should not load more when hasNextPage is false', () => {
		const mockFetchNextPage = jest.fn()

		mockUseGetRepositories.mockReturnValue({
			data: {
				pages: [[]],
				pageParams: [1],
			},
			isLoading: false,
			error: null,
			fetchNextPage: mockFetchNextPage,
			hasNextPage: false,
			isFetchingNextPage: false,
		} as unknown as ReturnType<typeof useGetRepositories>)

		const { result } = renderHook(() => useRepositoriesContainer())

		result.current.handleLoadMore()

		expect(mockFetchNextPage).not.toHaveBeenCalled()
	})

	it('should not load more when already fetching', () => {
		const mockFetchNextPage = jest.fn()

		mockUseGetRepositories.mockReturnValue({
			data: {
				pages: [[]],
				pageParams: [1],
			},
			isLoading: false,
			error: null,
			fetchNextPage: mockFetchNextPage,
			hasNextPage: true,
			isFetchingNextPage: true,
		} as unknown as ReturnType<typeof useGetRepositories>)

		const { result } = renderHook(() => useRepositoriesContainer())

		result.current.handleLoadMore()

		expect(mockFetchNextPage).not.toHaveBeenCalled()
	})

	describe('handleOpenUrl', () => {
		beforeEach(() => {
			mockUseGetRepositories.mockReturnValue({
				data: {
					pages: [[]],
					pageParams: [1],
				},
				isLoading: false,
				error: null,
				fetchNextPage: jest.fn(),
				hasNextPage: false,
				isFetchingNextPage: false,
			} as unknown as ReturnType<typeof useGetRepositories>)
		})

		it('should open URL when supported', async () => {
			const mockLinking = Linking as jest.Mocked<typeof Linking>
			mockLinking.canOpenURL.mockResolvedValue(true)
			mockLinking.openURL.mockResolvedValue(undefined)

			const { result } = renderHook(() => useRepositoriesContainer())

			const testUrl = 'https://github.com/user/repo'
			const openUrlFunction = result.current.handleOpenUrl(testUrl)

			await openUrlFunction()

			expect(mockLinking.canOpenURL).toHaveBeenCalledWith(testUrl)
			expect(mockLinking.openURL).toHaveBeenCalledWith(testUrl)
		})

		it('should show alert when URL is not supported', async () => {
			const mockLinking = Linking as jest.Mocked<typeof Linking>
			const mockAlert = Alert as jest.Mocked<typeof Alert>

			mockLinking.canOpenURL.mockResolvedValue(false)

			const { result } = renderHook(() => useRepositoriesContainer())

			const testUrl = 'invalid://url'
			const openUrlFunction = result.current.handleOpenUrl(testUrl)

			await openUrlFunction()

			expect(mockLinking.canOpenURL).toHaveBeenCalledWith(testUrl)
			expect(mockLinking.openURL).not.toHaveBeenCalled()
			expect(mockAlert.alert).toHaveBeenCalled()
		})

		it('should show alert when opening URL fails', async () => {
			const mockLinking = Linking as jest.Mocked<typeof Linking>
			const mockAlert = Alert as jest.Mocked<typeof Alert>

			mockLinking.canOpenURL.mockRejectedValue(new Error('Network error'))

			const { result } = renderHook(() => useRepositoriesContainer())

			const testUrl = 'https://github.com/user/repo'
			const openUrlFunction = result.current.handleOpenUrl(testUrl)

			await openUrlFunction()

			expect(mockLinking.canOpenURL).toHaveBeenCalledWith(testUrl)
			expect(mockAlert.alert).toHaveBeenCalled()
		})
	})
})
