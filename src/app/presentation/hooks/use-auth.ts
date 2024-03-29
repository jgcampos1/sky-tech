import { useEffect, useMemo, useState } from 'react';

import { AUTH_STORAGE_TOKENS } from '~/app/application/auth/domain/entities';
import { UserAuthModel } from '~/app/application/auth/domain/models/user-auth-model';
import { decoderLoginService } from '~/app/application/auth/services/decoder-user-token';
import { setToken } from '~/app/application/auth/store/actions/set-token';
import { USER_STORAGE_TOKENS } from '~/app/application/user/domain/entities/user-tokens';
import { cacheStorage } from '~/app/core/infra';
import { ROUTES } from '~/app/main/types';
import { APP_ENV } from '~/env';

import { useAppDispatch } from './use-app-dispatch';
import { useAppSelector } from './use-app-selector';

export const useAuth = () => {
  const { accessToken } = useAppSelector(({ authSlice }) => authSlice);
  const dispatch = useAppDispatch();

  const [authenticationToken, setAuthenticationToken] = useState(accessToken);
  const cacheLocalStorage = cacheStorage;
  const tokenDecoder = decoderLoginService;
  const tokenKey = AUTH_STORAGE_TOKENS.AUTH;
  const tokenKeyUser = USER_STORAGE_TOKENS.USER_INFO;

  const returnToLogin = () => {
    window.location.href = `${APP_ENV.APP_URL}${ROUTES.LOGIN}`;
  };

  const logout = () => {
    cacheLocalStorage.set(tokenKey, '');
    cacheLocalStorage.set(tokenKeyUser, '');
    window.location.href = `${APP_ENV.APP_URL}${ROUTES.LOGIN}`;
  };

  const useLogin = (token?: string) => {
    if (token) {
      setAuthenticationToken(token);
    }

    const tokenStorage: any = token || cacheLocalStorage.get<string>(tokenKey);

    if (!accessToken) {
      if (!tokenStorage) return;
      const decodedToken = tokenDecoder.decode(tokenStorage);
      setAuthenticationToken(decodedToken.accessToken);
      dispatch(setToken(decodedToken));
    }
  };

  const user = useMemo(() => {
    if (authenticationToken) {
      const decodedUser = cacheLocalStorage.get<UserAuthModel>(tokenKeyUser);
      return decodedUser;
    }
  }, [accessToken]);

  const isAuthenticated = useMemo(() => {
    return !!accessToken;
  }, [!!accessToken]);

  useEffect(() => {
    useLogin();
  }, []);
  return {
    isAuthenticated,
    user,
    accessToken,
    logout,
    useLogin,
    returnToLogin
  };
};
