import { createContext, type ReactNode, useContext } from 'react'
import type { ETheme } from '~/enums/theme'
import type { ITheme } from '~/interfaces/theme'
import { useThemeProviderContainer } from './container'

interface IAppThemeProviderContext {
	setLightTheme: () => void
	setDarkTheme: () => void
	toggleTheme: () => void
	theme: ITheme
	themeMode: ETheme
}

const AppThemeProviderContext = createContext<IAppThemeProviderContext>(
	{} as IAppThemeProviderContext,
)

export function AppThemeProvider({ children }: { children: ReactNode }) {
	const { themeMode, setDarkTheme, setLightTheme, toggleTheme, theme } =
		useThemeProviderContainer()

	return (
		<AppThemeProviderContext.Provider
			value={{
				setLightTheme,
				setDarkTheme,
				toggleTheme,
				theme: themeMode,
				themeMode: theme,
			}}
		>
			{children}
		</AppThemeProviderContext.Provider>
	)
}

export function useThemeContext() {
	return useContext(AppThemeProviderContext)
}
