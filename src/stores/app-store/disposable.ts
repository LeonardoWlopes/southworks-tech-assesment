import type { StateCreator } from 'zustand'

// biome-ignore lint/suspicious/noEmptyInterface: this is a placeholder
export interface IDisposableState {}

export interface IDisposableActions {
	setDisposable: (state: Partial<IDisposableState>) => void
}

export type IDisposableSlice = IDisposableState & IDisposableActions

const DISPOSABLE_DEFAULT_STATE: IDisposableState = {}

export const appStoreDisposableSlice: StateCreator<
	IDisposableSlice,
	[],
	[],
	IDisposableSlice
> = (set) => ({
	...DISPOSABLE_DEFAULT_STATE,
	setDisposable: (state) => set(state),
})
