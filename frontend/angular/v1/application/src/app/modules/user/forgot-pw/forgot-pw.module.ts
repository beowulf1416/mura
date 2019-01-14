import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingModule } from './routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../shared/material/material.module';

import { ForgotPwComponent } from './components/forgot-pw/forgot-pw.component';
import { ForgotPwSuccessComponent } from './components/forgot-pw-success/forgot-pw-success.component';
import { ForgotPwRequestComponent } from './components/forgot-pw-request/forgot-pw-request.component';
import { ForgotPwRequestSuccessComponent } from './components/forgot-pw-request-success/forgot-pw-request-success.component';

@NgModule({
  declarations: [
    ForgotPwComponent,
    ForgotPwSuccessComponent,
    ForgotPwRequestComponent,
    ForgotPwRequestSuccessComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RoutingModule
  ]
})
export class ForgotPwModule { }
