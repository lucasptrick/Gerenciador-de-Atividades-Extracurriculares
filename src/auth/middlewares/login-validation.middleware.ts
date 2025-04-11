import {
    BadRequestException,
    Injectable,
    NestMiddleware,
  } from '@nestjs/common';
  import { NextFunction, Request, Response } from 'express';
  import { LoginRequestBody } from '../models/LoginRequestBody';
  import { validate } from 'class-validator';
  
  @Injectable()
  export class LoginValidationMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
      const body = req.body;
  
      const loginRequestBody = new LoginRequestBody();
      loginRequestBody.email = body.email;
      loginRequestBody.password = body.password;
  
      const validations = await validate(loginRequestBody);
  
      if (validations.length) {
        const errors = validations.flatMap(validation =>
          validation.constraints ? Object.values(validation.constraints) : []
        );
        throw new BadRequestException(errors);
      }
      
  
      next();
    }
  }