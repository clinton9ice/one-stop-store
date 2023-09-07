export default defineNuxtPlugin(nuxtApp => {
	nuxtApp.vueApp.directive('number', {
		created (el: HTMLDivElement) {
			el.addEventListener('input', (t: Event) => {
				const target = t.target as HTMLSelectElement
				target.value = target.value.replace(/\D+/g, '')
			})
		}
	})
	nuxtApp.vueApp.directive('naira', {
		created (el: HTMLDivElement) {
			el.addEventListener('input', (t: Event) => {
				const target = t.target as HTMLSelectElement
				target.value = useCurrency().currencyToNaira(target.value) || ''
			})
		}
	})
})
