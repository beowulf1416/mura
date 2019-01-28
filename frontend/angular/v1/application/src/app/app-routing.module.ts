import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './classes/auth-guard';

import { DefaultComponent } from './components/default/default.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { ClientSelectComponent } from './components/client-select/client-select.component';
import { ClientJoinComponent } from './components/client-join/client-join.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent
  },
  {
    path: 'dashboard',
    canActivate: [ AuthGuard ],
    data: {
      permission: 'user.dashboard'
    },
    component: DashboardComponent
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent
  },
  {
    path: 'select/client',
    component: ClientSelectComponent
  },
  {
    path: 'join/client',
    component: ClientJoinComponent
  },
  {
    path: 'user/signin',
    loadChildren: './modules/user/signin/signin.module#SigninModule'
  },
  {
    path: 'user/signout',
    loadChildren: './modules/user/signout/signout.module#SignoutModule'
  },
  {
    path: 'user/signup',
    loadChildren: './modules/user/signup/signup.module#SignupModule'
  },
  {
    path: 'user/forgot-pw',
    loadChildren: './modules/user/forgot-pw/forgot-pw.module#ForgotPwModule'
  },
  {
    path: 'admin',
    loadChildren: './modules/admin/admin.module#AdminModule'
  },
  {
    path: 'admin/clients',
    loadChildren: './modules/admin/modules/clients/clients.module#ClientsModule'
  },
  {
    path: 'admin/security',
    loadChildren: './modules/admin/modules/security/security.module#SecurityModule'
  },
  {
    path: 'inventory',
    loadChildren: './modules/inventory/inventory.module#InventoryModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuard
  ]
})
export class AppRoutingModule { }
