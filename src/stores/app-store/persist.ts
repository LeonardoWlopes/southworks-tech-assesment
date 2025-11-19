import type { StateCreator } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { ETheme } from '~/enums/theme'
import { zustandStorage } from '~/utils/storage'

export interface IPersistentState {
	theme: ETheme
}

export interface IPersistentActions {
	setPersist: (state: Partial<IPersistentState>) => void
}

export type IPersistentSlice = IPersistentState & IPersistentActions

const PERSISTENT_DEFAULT_STATE: IPersistentState = {
	theme: ETheme.LIGHT,
}

function partialize(state: IPersistentState) {
	const keysToPersist = Object.keys(PERSISTENT_DEFAULT_STATE) as Array<
		keyof IPersistentState
	>

	return keysToPersist.reduce(
		/* istanbul ignore next */
		(acc: Partial<Record<keyof IPersistentState, unknown>>, key) => {
			if (key in state) {
				acc[key] = state[key]
			}
			return acc
		},
		{} as Partial<IPersistentState>,
	)
}

const _appStorePersistentSlice: StateCreator<
	IPersistentSlice,
	[],
	[],
	IPersistentSlice
> = (set) => ({
	...PERSISTENT_DEFAULT_STATE,
	setPersist: (state) => set(state),
})

export const appStorePersistentSlice = persist(_appStorePersistentSlice, {
	name: 'app-store',
	storage: createJSONStorage(() => zustandStorage),
	partialize,
})
