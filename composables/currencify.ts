export const useCurrency = () => {
	const format = (e: number) => {
		if (!isNaN(e)) {
			return e.toLocaleString()
		}
	}
	const currencyToNaira = (val: string | number) => {
		if (typeof val === 'string' || typeof val === 'number') {
			const amount = String(val)
				.replace(/\D/g, '')
				.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
			return '₦ ' + amount
		}
	}
	const nairaToNumber = (val: string) => {
		return typeof val === 'string'
			? parseInt(val.replace('₦ ', '').replace(/,/g, ''), 10)
			: 0
	}
	return {
		format,
		currencyToNaira,
		nairaToNumber
	}
}
