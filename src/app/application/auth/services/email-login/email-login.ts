import type { LoginForm } from '~/app/application/auth/domain/models';
import { GetUserProfile } from '~/app/application/user/application/services';
import { RequestResponse } from '~/app/core/application/http-response/http-response';
import type {
  CacheStorage,
  HttpClient
} from '~/app/core/application/protocols';
import { HttpMethod } from '~/app/core/application/protocols';
import type { ServiceCommand } from '~/app/core/domain/command/service-command';
import { error, success } from '~/app/core/domain/either/either';

import { TokenModel } from '../../domain/models/toke-model';

export class EmailLogin implements ServiceCommand<EmailLogin.Response> {
  constructor(
    private readonly httpClient: HttpClient<EmailLogin.Response>,
    private readonly cacheStorage: CacheStorage,
    private readonly tokenKey: string,
    private readonly tokenUserKey: string,
    private readonly url: string
  ) {}

  async execute(
    params: EmailLogin.Params
  ): Promise<ServiceCommand.Response<EmailLogin.Response>> {
    const httpResponse = await this.httpClient.request({
      method: HttpMethod.POST,
      url: this.url,
      body: params
    });

    const responseOrError = RequestResponse.handle(httpResponse);

    if (responseOrError.isError()) {
      return error(responseOrError.value);
    }
    const response = responseOrError.value.response;

    const userProfileData: GetUserProfile.LocalStorageSystemInfo =
      this.cacheStorage.get(this.tokenUserKey);

    const { accessToken, ...user } = response;
    this.cacheStorage.set(this.tokenKey, accessToken);

    this.cacheStorage.set(this.tokenUserKey, { userProfileData, ...user });

    return success(response);
  }
}

export namespace EmailLogin {
  export type Params = LoginForm;

  export type Response = TokenModel;
}
