import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../../../classes/auth-guard';

import { MainComponent } from './components/main/main.component';
import { PermissionListComponent } from './components/permission-list/permission-list.component';
import { RoleListComponent } from './components/role-list/role-list.component';
import { UserListComponent } from './components/user-list/user-list.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    // canActivate: [ AuthGuard ],
    // data: {
    //   permission: 'security.admin'
    // },
    children: [
      {
        path: '',
        component: UserListComponent
      },
      {
        path: 'users',
        component: UserListComponent
      },
      {
        path: 'permissions',
        component: PermissionListComponent
      },
      {
        path: 'roles',
        component: RoleListComponent
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
