export type PhotoContext = {
	src: string | ArrayBuffer | null
	file: string | File
	name: string
}
export const useMedia = () => {
	interface callbackFn {
		(e: PhotoContext): void
	}
	const getPhoto = (e: Event, fn: callbackFn) => {
		const fileTarget = e.target as HTMLInputElement

		if (fileTarget.files && fileTarget.files.length > 0) {
			const file = fileTarget.files[0]
			const fileSize = Math.round(file.size / 1024)
			if (fileSize <= 1096) {
				const fileReader = new FileReader()
				fileReader.onload = e => {
					const result = (e.currentTarget as FileReader).result

					if (
						[
							'image/jpeg',
							'image/png',
							'image/webp',
							'/image/jpg'
						].includes(file.type)
					) {
						fn({
							file,
							src: result,
							name: file.name
						})
					}
				}
				fileReader.readAsDataURL(file)

				return null
			}
			useNotification().alert({
				message: 'Please use a media less or equal to 1mb',
				status: 400
			})
		}
	}
	return ref({ getPhoto })
}
