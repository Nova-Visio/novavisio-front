import { AuthConfig } from '@novavisio/auth';
import * as routesConfig from './routes.config';

export const authConfig: AuthConfig = {
  loginRoute: `${routesConfig.auth}/${routesConfig.login}`,
};
