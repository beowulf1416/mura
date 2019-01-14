import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from './routing.module';

import { MaterialModule } from '../../shared/material/material.module';

import { SignupComponent } from './components/signup/signup.component';
import { VerifyComponent } from './components/verify/verify.component';
import { SignupSuccessComponent } from './components/signup-success/signup-success.component';

@NgModule({
  declarations: [
    SignupComponent,
    VerifyComponent,
    SignupSuccessComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RoutingModule
  ]
})
export class SignupModule { }
