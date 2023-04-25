import { NavItem } from '@novavisio/components';
import * as routesConfig from './routes.config';

export const customersListKey = 'customersList';
export const customersListItem: NavItem = {
  name: customersListKey,
  keyTranslate: 'MASTER_PAGE.NAV.CUSTOMERS_LIST',
  icon: 'person',
  url: `/${routesConfig.customers}/${routesConfig.customersList}`
}

export const dashboardKey = 'dashboard';
export const dashboardItem: NavItem = {
  name: customersListKey,
  keyTranslate: 'MASTER_PAGE.NAV.DASHBOARD',
  icon: 'dashboard',
  url: `/${routesConfig.dashboard}`,
  divider: true
}

export const logoutKey = 'logout';
export const logoutItem: NavItem = {
  name: customersListKey,
  keyTranslate: 'MASTER_PAGE.NAV.LOGOUT',
  icon: 'logout',
  url: `/${routesConfig.auth}/${routesConfig.login}`
}

export const ordersListKey = 'ordersList';
export const ordersListItem: NavItem = {
  name: ordersListKey,
  keyTranslate: 'MASTER_PAGE.NAV.ORDERS_LIST',
  icon: 'local_shipping',
  url: `/${routesConfig.orders}`,
  divider: true
}

export const productsFormKey = 'productsForm';
export const productsFormItem: NavItem = {
  name: productsFormKey,
  keyTranslate: 'MASTER_PAGE.NAV.PRODUCTS_FORM',
  icon: 'add',
  url: `/${routesConfig.products}/${routesConfig.productsForm}`,
  divider: true
}

export const productsListKey = 'productsList';
export const productsListItem: NavItem = {
  name: productsListKey,
  keyTranslate: 'MASTER_PAGE.NAV.PRODUCTS_LIST',
  icon: 'wine_bar',
  url: `/${routesConfig.products}`
}

export const navItems: NavItem[] = [
  dashboardItem,
  productsListItem,
  productsFormItem,
  customersListItem,
  ordersListItem,
  logoutItem
];
