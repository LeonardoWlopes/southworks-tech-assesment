import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { ETheme } from '~/enums/theme'
import { zustandStorage } from '~/utils/storage'

interface IAppState {
	theme: ETheme
	showRepositoryLanguage: boolean
}

interface IAppActions {
	set: (state: Partial<IAppState>) => void
	reset: () => void
}

type IAppStore = IAppState & IAppActions

const DEFAULT_STATE: IAppState = {
	theme: ETheme.LIGHT,
	showRepositoryLanguage: true,
}

export const useAppStore = create<IAppStore>()(
	persist(
		(set) => ({
			...DEFAULT_STATE,
			set: (state) => set(state),
			reset: () => set(DEFAULT_STATE),
		}),
		{
			name: 'app-store',
			storage: createJSONStorage(() => zustandStorage),
		},
	),
)
