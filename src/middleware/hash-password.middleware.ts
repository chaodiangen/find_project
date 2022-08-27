import { Injectable, NestMiddleware } from '@nestjs/common';
import { addSalt, encrypt } from 'src/utils/encrtiption';

@Injectable()
export class HashPasswordMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    let userPassword = req.body['password'];
    if (userPassword) {
      const salt = addSalt();
      userPassword = encrypt(userPassword, salt);
      req.body['password'] = userPassword;
      req.body['salt'] = salt;
    }
    next();
  }
}
