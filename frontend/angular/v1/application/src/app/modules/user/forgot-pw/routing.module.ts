import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ForgotPwComponent } from './components/forgot-pw/forgot-pw.component';
import { ForgotPwRequestComponent } from './components/forgot-pw-request/forgot-pw-request.component';
import { ForgotPwRequestSuccessComponent } from './components/forgot-pw-request-success/forgot-pw-request-success.component';
import { ForgotPwSuccessComponent } from './components/forgot-pw-success/forgot-pw-success.component';


const routes: Routes = [
  {
    path: '',
    component: ForgotPwRequestComponent
  },
  {
    path: 'request',
    component: ForgotPwRequestComponent
  },
  {
    path: 'request/success',
    component: ForgotPwRequestSuccessComponent
  },
  {
    path: 'reset/:token',
    component: ForgotPwComponent
  },
  {
    path: 'success',
    component: ForgotPwSuccessComponent
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
