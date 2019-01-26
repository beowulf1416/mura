import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingModule } from './routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from 'src/app/modules/shared/material/material.module';

import { PermissionListComponent } from './components/permission-list/permission-list.component';
import { PermissionComponent } from './components/permission/permission.component';
import { RoleComponent } from './components/role/role.component';
import { RoleListComponent } from './components/role-list/role-list.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserComponent } from './components/user/user.component';
import { MainComponent } from './components/main/main.component';

@NgModule({
  declarations: [
    PermissionListComponent,
    PermissionComponent,
    RoleComponent,
    RoleListComponent,
    UserListComponent,
    UserComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RoutingModule
  ]
})
export class SecurityModule { }
