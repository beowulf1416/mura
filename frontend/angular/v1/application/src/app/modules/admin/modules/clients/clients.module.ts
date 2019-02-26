import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from './routing.module';

import { MaterialModule } from '../../../shared/material/material.module';

import { ClientListComponent } from './components/client-list/client-list.component';
import { ClientComponent } from './components/client/client.component';
import { MainComponent } from './components/main/main.component';
import { OrganizationComponent } from './components/organization/organization.component';
import { OrganizationsComponent } from './components/organizations/organizations.component';

@NgModule({
  declarations: [
    ClientListComponent,
    ClientComponent,
    MainComponent,
    OrganizationComponent,
    OrganizationsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RoutingModule
  ]
})
export class ClientsModule { }
