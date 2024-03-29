import { HttpErrorsType } from '../../application/protocols';
import { type DomainException } from './domain-exception';

export class ExpirationTokenException implements DomainException {
  message = 'Token de usuário expirado';
  code = HttpErrorsType.EXPIRATION_INVALID;
}
