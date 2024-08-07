import development from './development'
import production from './production'

function getConfig(environment: string) {
	if (environment === 'development') {
		return development
	} else if (environment === 'production') {
		return production
	} else {
		return development
	}
}
console.log('process.env.NODE_ENV: ', process.env.NODE_ENV)
export const config = getConfig(process.env.NODE_ENV)
