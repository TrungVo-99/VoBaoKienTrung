import { BaseMiddleware } from './base'
// import { tokenService, userService } from '@/services';
import { NextFunction } from 'express'
import { Request, Response } from '@/routers/base'
import { BaseError } from '@/services/errors'
import { AuthException, HttpStatus } from '@/common/enum'

export class AuthInfoMiddleware extends BaseMiddleware {
	async use(
		req: Request,
		res: Response,
		next: NextFunction,
		providers: string[] = [],
	): Promise<void> {
		try {
			// const Authorization: string = req.header('Authorization') ? req.header('Authorization').toString().split('Bearer ')[1] : null;
			// if (Authorization) {
			//     const verificationResponse = await tokenService.decodeToken(Authorization);
			//     const { user_id } = verificationResponse.payload;
			//     const findUser: any = await userService.getItem({ where: { id: user_id }, raw: true });
			//     findUser.is_set_new_pw = false
			//     if (!findUser.password) {
			//         findUser.is_set_new_pw = true
			//     }
			//     delete findUser.password;
			//     if (findUser) {
			//         req.tokenInfo = verificationResponse;
			//         req.tokenInfo.user = findUser;
			//         next();
			//     } else {
			//         throw new BaseError({ code: HttpStatus.UNAUTHORIZED, message: 'Wrong authentication token', type: AuthException.UNAUTHORIZED });
			//     }
			// } else {
			//     throw new BaseError({ code: HttpStatus.UNAUTHORIZED, message: 'Authentication token missing', type: AuthException.UNAUTHORIZED });
			// }
		} catch (error) {
			throw new BaseError({
				code: HttpStatus.UNAUTHORIZED,
				message: error.options.message,
				type: AuthException.UNAUTHORIZED,
			})
		}
	}
}
