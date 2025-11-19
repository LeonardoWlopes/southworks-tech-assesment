import type { ReactNode } from 'react'
import type { KeyboardAvoidingViewProps, ScrollViewProps } from 'react-native'
import type { SafeAreaViewProps } from 'react-native-safe-area-context'
import type { IColors } from '~/interfaces/theme'

export interface IScreenWrapperProps {
	disableSafeArea?: boolean
	safeAreaProps?: SafeAreaViewProps
	disableScrollView?: boolean
	scrollProps?: ScrollViewProps
	disableKeyboard?: boolean
	keyboardProps?: KeyboardAvoidingViewProps
	children?: ReactNode
	backgroundColor?: IColors
}
