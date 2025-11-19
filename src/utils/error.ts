import type { AxiosError } from 'axios'
import type { IError } from '~/interfaces/error'
import { errorLogger } from './log'

export function responseErroHandler(err: AxiosError<IError>) {
	const error = err.response?.data

	if (err.code === 'ECONNABORTED') {
		errorLogger('Timeout')

		throw new Error('Timeout')
	}

	const firstError = error?.errors?.[0]

	let message = firstError || error?.message || err.message

	if (err.response?.status === 401) {
		// TODO: handle unauthorized errors

		message = 'Unauthorized'
	}

	const logInfos = [err?.response?.status, err?.config?.url, message]
		.filter(Boolean)
		.join(' - ')

	errorLogger(logInfos)

	throw Error(logInfos, { cause: message })
}
