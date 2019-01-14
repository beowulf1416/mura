import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingModule } from './routing.module';
import { SignoutComponent } from './components/signout/signout.component';

@NgModule({
  declarations: [SignoutComponent],
  imports: [
    CommonModule,
    RoutingModule
  ]
})
export class SignoutModule { }
