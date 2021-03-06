import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../../../classes/auth-guard';
import { MainComponent } from './components/main/main.component';
import { ClientListComponent } from './components/client-list/client-list.component';
import { ClientComponent } from './components/client/client.component';
import { OrganizationsComponent } from './components/organizations/organizations.component';
import { OrganizationComponent } from './components/organization/organization.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [ AuthGuard ],
    data: {
      permission: 'admin.clients'
    },
    children: [
      {
        path: '',
        canActivate: [ AuthGuard ],
        data: {
          permission: 'clients.list'
        },
        component: ClientListComponent
      },
      {
        path: 'new',
        canActivate: [ AuthGuard ],
        data: {
          permission: 'clients.add'
        },
        component: ClientComponent
      },
      {
        path: 'organizations',
        component: OrganizationsComponent
      },
      {
        path: 'organizations/new',
        component: OrganizationComponent
      },
      {
        path: 'organizations/:id',
        component: OrganizationComponent
      },
      {
        path: ':id',
        component: ClientComponent
      },
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
