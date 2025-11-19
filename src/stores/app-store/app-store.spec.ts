import { act, renderHook } from '@testing-library/react-hooks'
import { ETheme } from '~/enums/theme'
import { useAppStore } from './index'

describe('useAppStore', () => {
	beforeEach(() => {
		useAppStore.getState().reset()
	})

	it('should initialize with default state', () => {
		const { result } = renderHook(() => useAppStore())

		expect(result.current.theme).toBe(ETheme.LIGHT)
		expect(result.current.showRepositoryLanguage).toBe(true)
	})

	it('should update state when set is called', () => {
		const { result } = renderHook(() => useAppStore())

		act(() => {
			result.current.set({ theme: ETheme.DARK })
		})

		expect(result.current.theme).toBe(ETheme.DARK)
	})

	it('should reset to default state', () => {
		const { result } = renderHook(() => useAppStore())

		act(() => {
			result.current.set({
				theme: ETheme.DARK,
				showRepositoryLanguage: false,
			})
		})

		expect(result.current.theme).toBe(ETheme.DARK)
		expect(result.current.showRepositoryLanguage).toBe(false)

		act(() => {
			result.current.reset()
		})

		expect(result.current.theme).toBe(ETheme.LIGHT)
		expect(result.current.showRepositoryLanguage).toBe(true)
	})
})
