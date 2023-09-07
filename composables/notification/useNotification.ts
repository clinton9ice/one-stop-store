import { message } from 'ant-design-vue'
import { NotificationTypes } from '@/types'

export const useNotification = () => {
	const errorState = useState('Notification')
	const set = (message: NotificationTypes) => {
		clear()
		if (!Array.isArray(message?.data)) {
			console.error(message)

			errorState.value = {
				notificationStatus: message.response?.status || 400,
				notificationMessage:
					!Array.isArray(message?.data) && message.data?.errors[0]
						? message.data?.errors[0]
						: message.text || 'Network Error'
			}
		} else if (message.response) {
			errorState.value = {
				notificationStatus: message.response.status,
				notificationMessage: message?.data?.errors
					? message.data.errors[0]
					: message.text || 'Network Error'
			}
		}
	}
	const clear = () => {
		errorState.value = {}
	}
	const alert = (arg: { status: number; message: string }) => {
		TimeOut(100).then(() => {
			if (arg.status >= 400) {
				message.error({
					content: () => `${arg.message}`,
					class: 'notify'
				})
			} else {
				message.success({
					content: () => `${arg.message}`,
					class: 'notify'
				})
			}
		})
	}
	return {
		set,
		clear,
		alert
	}
}
