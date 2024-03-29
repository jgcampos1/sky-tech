import jwtDecode from 'jwt-decode';
import type { TokenDecoder } from '~/app/core/application/protocols/token-decoder';

export class JWTTokenDecoder implements TokenDecoder {
  decode<T>(token: string): T {
    const decodedToken = jwtDecode<T>(token);
    return decodedToken;
  }
}
