import type { AxiosError, InternalAxiosRequestConfig } from 'axios'
import type { IError } from '~/interfaces/error'
import { responseErroHandler } from '~/utils/error'
import { errorLogger } from '~/utils/log'

jest.mock('~/utils/log')

describe('responseErroHandler', () => {
	const mockError = (
		overrides: Partial<AxiosError<IError>> = {},
	): AxiosError<IError> => ({
		isAxiosError: true,
		toJSON: () => ({}),
		config: {} as InternalAxiosRequestConfig,
		name: 'AxiosError',
		message: 'An error occurred',
		response: {
			data: {
				message: 'Error message',
				errors: ['First error'],
			},
			status: 500,
			statusText: 'Internal Server Error',
			headers: {},
			config: {} as InternalAxiosRequestConfig,
		},
		...overrides,
	})

	it('should log and throw timeout error', () => {
		const err = mockError({ code: 'ECONNABORTED' })

		const errorMessage = 'Timeout'

		expect(() => responseErroHandler(err)).toThrow(errorMessage)
		expect(errorLogger).toHaveBeenCalledWith(errorMessage)
	})

	it('should log and throw error with first error message', () => {
		const err = mockError()

		const errorMessage = '500 - First error'

		expect(() => responseErroHandler(err)).toThrow(errorMessage)

		expect(errorLogger).toHaveBeenCalledWith(errorMessage)
	})

	it('should log and throw error with response message', () => {
		const err = mockError({
			response: {
				data: {
					message: 'Response error message',
				},
				status: 500,
				statusText: 'Internal Server Error',
				headers: {},
				config: {} as InternalAxiosRequestConfig,
			},
		})

		const errorMessage = '500 - Response error message'

		expect(() => responseErroHandler(err)).toThrow(errorMessage)
		expect(errorLogger).toHaveBeenCalledWith(errorMessage)
	})

	it('should log and throw error with default error message', () => {
		const err = mockError({
			response: {
				data: {} as IError,
				status: 500,
				statusText: 'Internal Server Error',
				headers: {},
				config: {} as InternalAxiosRequestConfig,
			},
		})

		const errorMessage = '500 - An error occurred'

		expect(() => responseErroHandler(err)).toThrow(errorMessage)
		expect(errorLogger).toHaveBeenCalledWith(errorMessage)
	})

	it('should handle unauthorized errors (status 401)', () => {
		const err = mockError({
			response: {
				data: {} as IError,
				status: 401,
				statusText: 'Unauthorized',
				headers: {},
				config: {} as InternalAxiosRequestConfig,
			},
		})

		const errorMessage = '401 - Unauthorized'

		expect(() => responseErroHandler(err)).toThrow(errorMessage)
		expect(errorLogger).toHaveBeenCalledWith(errorMessage)
	})
})
