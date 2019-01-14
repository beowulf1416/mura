import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './components/signup/signup.component';
import { VerifyComponent } from './components/verify/verify.component';
import { SignupSuccessComponent } from './components/signup-success/signup-success.component';

const routes: Routes = [
  {
    path: '',
    component: SignupComponent
  },
  {
    path: 'success',
    component: SignupSuccessComponent
  },
  {
    path: 'verify/:token',
    component: VerifyComponent
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
