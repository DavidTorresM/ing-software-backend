import { 
    Injectable,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Privilege } from 'src/utils/string.util';

@Injectable()
export class JwtAuthGuardDocente extends AuthGuard('jwt'){
  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user ||  user.privilege === Privilege.ALUMNO) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}