import { errorLogger, messageLogger, warnLogger } from '../../../src/utils/log'

jest.mock('react-native', () => ({
	Platform: { OS: 'ios' },
}))

describe('log utils', () => {
	// @ts-ignore
	const originalDev = global.__DEV__
	const originalConsoleLog = console.log
	const originalConsoleError = console.error
	const originalConsoleWarn = console.warn

	beforeEach(() => {
		// @ts-ignore
		global.__DEV__ = true
		console.log = jest.fn()
		console.error = jest.fn()
		console.warn = jest.fn()
	})

	afterEach(() => {
		// @ts-ignore
		global.__DEV__ = originalDev
		console.log = originalConsoleLog
		console.error = originalConsoleError
		console.warn = originalConsoleWarn
	})

	it('should log a message with devLog', () => {
		messageLogger('test message')
		expect(console.log).toHaveBeenCalledWith(expect.stringContaining('IOS'))
		expect(console.log).toHaveBeenCalledWith(
			expect.stringContaining('test message'),
		)
	})

	it('should log an error with devError', () => {
		errorLogger('test error')
		expect(console.error).toHaveBeenCalledWith(
			expect.stringContaining('IOS'),
		)
		expect(console.error).toHaveBeenCalledWith(
			expect.stringContaining('test error'),
		)
	})

	it('should log a warning with devWarn', () => {
		warnLogger('test warning')
		expect(console.warn).toHaveBeenCalledWith(
			expect.stringContaining('IOS'),
		)
		expect(console.warn).toHaveBeenCalledWith(
			expect.stringContaining('test warning'),
		)
	})

	it('should format message correctly', () => {
		messageLogger('test message', { key: 'value' })
		expect(console.log).toHaveBeenCalledWith(expect.stringContaining('IOS'))

		expect(console.log).toHaveBeenCalledWith(
			expect.stringContaining('test message'),
		)
		expect(console.log).toHaveBeenCalledWith(
			expect.stringContaining(JSON.stringify({ key: 'value' }, null, 2)),
		)
	})

	it('should not log if not in __DEV__ mode', () => {
		// @ts-ignore
		global.__DEV__ = false
		messageLogger('test message')
		errorLogger('test error')
		warnLogger('test warning')
		expect(console.log).not.toHaveBeenCalled()
		expect(console.error).not.toHaveBeenCalled()
		expect(console.warn).not.toHaveBeenCalled()
	})
})
