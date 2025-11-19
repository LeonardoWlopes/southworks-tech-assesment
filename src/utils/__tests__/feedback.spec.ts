import * as haptics from 'expo-haptics'
import { Feedback } from '~/utils/feedback'

jest.mock('expo-haptics')

describe('Feedback', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('should trigger light haptic feedback', () => {
		Feedback.haptic.light()
		expect(haptics.impactAsync).toHaveBeenCalledWith(
			haptics.ImpactFeedbackStyle.Light,
		)
	})

	it('should trigger medium haptic feedback', () => {
		Feedback.haptic.medium()
		expect(haptics.impactAsync).toHaveBeenCalledWith(
			haptics.ImpactFeedbackStyle.Medium,
		)
	})

	it('should trigger heavy haptic feedback', () => {
		Feedback.haptic.heavy()
		expect(haptics.impactAsync).toHaveBeenCalledWith(
			haptics.ImpactFeedbackStyle.Heavy,
		)
	})

	it('should trigger selection haptic feedback', () => {
		Feedback.haptic.selection()
		expect(haptics.selectionAsync).toHaveBeenCalled()
	})

	it('should trigger error notification feedback', () => {
		Feedback.haptic.error()
		expect(haptics.notificationAsync).toHaveBeenCalledWith(
			haptics.NotificationFeedbackType.Error,
		)
	})

	it('should trigger success notification feedback', () => {
		Feedback.haptic.success()
		expect(haptics.notificationAsync).toHaveBeenCalledWith(
			haptics.NotificationFeedbackType.Success,
		)
	})

	it('should trigger warning notification feedback', () => {
		Feedback.haptic.warning()
		expect(haptics.notificationAsync).toHaveBeenCalledWith(
			haptics.NotificationFeedbackType.Warning,
		)
	})
})
