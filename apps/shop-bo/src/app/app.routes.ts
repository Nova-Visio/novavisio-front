import { Route } from '@angular/router';
import { AuthGuard } from '@novavisio/auth';
import * as routesConfig from './config/routes.config';

export const appRoutes: Route[] = [
  {
    path: routesConfig.auth,
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
      path: routesConfig.customers,
      loadChildren: () => import('./customers/customers.module').then((m) => m.CustomersModule),
      canActivate: [AuthGuard],
      canLoad: [AuthGuard],
  },
  {
      path: routesConfig.dashboard,
      loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      canActivate: [AuthGuard],
      canLoad: [AuthGuard],
  },
  {
    path: routesConfig.orders,
    loadChildren: () => import('./orders/orders.module').then((m) => m.OrdersModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
    path: routesConfig.products,
    loadChildren: () => import('./products/products.module').then((m) => m.ProductsModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
      path: '**',
      redirectTo: routesConfig.dashboard,
  },
];
