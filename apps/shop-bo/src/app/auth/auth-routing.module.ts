import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as routesConfig from '../config/routes.config';

const routes: Routes = [{
    path: routesConfig.login,
    loadChildren: () => import('./login/login.module').then((m) => m.LoginModule),
},
{
    path: '',
    pathMatch: 'full',
    redirectTo: `${routesConfig.login}`,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
