import type { TokenDecoder } from '~/app/core/application/protocols/token-decoder';
import { LocalCommand } from '~/app/core/domain/command/local-command';

import { TokenModel } from '../../domain/models/toke-model';

export interface DecodeUserToken {
  decode: (token: string) => TokenModel;
}

export class LocalDecodeUserToken implements DecodeUserToken {
  constructor(private readonly tokenDecoder: TokenDecoder) {}

  decode(token: string): LocalDecodeUserToken.Response {
    if (!token) {
      throw new Error('Token not provided.');
    }
    const { exp, id, email } = this.tokenDecoder.decode<{
      exp: number;
      id: string;
      email: string;
    }>(token);

    return {
      accessToken: token,
      expiresIn: exp,
      id,
      email
    };
  }
}

export namespace LocalDecodeUserToken {
  export type Params = { token: string };

  export type Response = TokenModel;
}
