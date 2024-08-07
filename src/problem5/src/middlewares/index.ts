import { AuthInfoMiddleware } from './authMiddleware'
import { QueryMiddleware } from './queryMiddleware'


const authInfoMiddleware = new AuthInfoMiddleware()
const queryMiddleware = new QueryMiddleware()

export {
	authInfoMiddleware,
	queryMiddleware,
}

