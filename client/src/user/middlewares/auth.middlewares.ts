import { JWT_SECRET } from "@app/config";
import { ExpressRequestInterface } from "@app/types/expressRequest.interface";
import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken';
import { UserService } from "../user.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
	
	constructor(private readonly UserService: UserService) {}
	
	async use(req: ExpressRequestInterface, res: Response, next: NextFunction) {
		if (!req.headers.authorization) {
			req.user = null
			next()
			return;
		}

		const token = req.headers.authorization.split(' ')[1];
		console.log('token', token);

		try {
			const decode = verify(token, JWT_SECRET);
			if (typeof decode !== "string") {
				const user = await this.UserService.findById(decode.id);
				req.user = user;
			}
			next();
		} catch (err) {
			req.user = null
			next();
		}
	}
}