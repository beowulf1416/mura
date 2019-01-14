import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingModule } from './routing.module';
import { MainComponent } from './components/main/main.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [MainComponent, DashboardComponent],
  imports: [
    CommonModule,
    RoutingModule
  ]
})
export class InventoryModule { }
