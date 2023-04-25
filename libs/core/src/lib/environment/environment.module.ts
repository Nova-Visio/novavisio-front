import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Environment } from './environment';
import { tap } from 'rxjs';

const appInitializerFn =
  (httpClient: HttpClient, environment: Environment) => () =>
    httpClient.get<Environment>('./runtime-environment/runtime-environment.json').pipe(
      tap(({ apiUrl, production }: Environment) => {
        environment.apiUrl = apiUrl;
        environment.production = production;
      })
    );

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    {
      provide: Environment,
      useValue: {},
    },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      deps: [HttpClient, Environment],
      multi: true,
    },
  ],
  exports: [],
})
export class EnvironmentModule {}
