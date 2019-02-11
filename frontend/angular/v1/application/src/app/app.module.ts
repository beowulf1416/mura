import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './modules/shared/material/material.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from './classes/state';
import { UserEffects } from './classes/effects/user';

import { Window } from './classes/window';
import { Storage } from './classes/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DefaultComponent } from './components/default/default.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { MessagesComponent } from './components/messages/messages.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ClientSelectComponent } from './components/client-select/client-select.component';
import { ClientJoinComponent } from './components/client-join/client-join.component';

@NgModule({
  declarations: [
    AppComponent,
    DefaultComponent,
    DashboardComponent,
    ForbiddenComponent,
    MessagesComponent,
    NotificationsComponent,
    ClientSelectComponent,
    ClientJoinComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      UserEffects
    ]),
    AppRoutingModule
  ],
  exports: [],
  providers: [
    Window,
    Storage
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
