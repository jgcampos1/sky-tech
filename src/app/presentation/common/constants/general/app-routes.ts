import { ParamParseKey } from 'react-router';
import { generatePath } from 'react-router-dom';

import { RoutesConfig } from '~/app/main/config/routes-config';
import { ROUTES } from '~/app/main/types';

type AppRouteType = {
  [key in ROUTES]: {
    path: string;
    navigate: <S extends string>(params?: ParamParseKey<S>) => string;
  };
};

const MakeAppRoutes = () =>
  RoutesConfig.reduce<Partial<AppRouteType>>(
    (accumulator, current) => ({
      ...accumulator,
      [current.name]: {
        path: current.path,

        navigate: <S extends string>(params?: ParamParseKey<S>) =>
          generatePath(current.path, params)
      }
    }),
    {}
  );

export const AppRoutes = MakeAppRoutes();
