import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
export const useMobile = () => {
	const breakpoints = useBreakpoints(breakpointsTailwind)
	const isMobile = breakpoints.smaller('lg')
	const deviceType = ref<'tablet' | 'desktop' | 'mobile' | null>(null)
	const ua = navigator.userAgent
	if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
		deviceType.value = 'tablet'
	} else if (
		/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
			ua
		)
	) {
		deviceType.value = 'mobile'
	} else {
		deviceType.value = 'desktop'
	}
	return { isMobile, deviceType }
}
