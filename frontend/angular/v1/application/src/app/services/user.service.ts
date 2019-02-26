import { Injectable } from '@angular/core';
import { Observable, NextObserver, of, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Store, select } from '@ngrx/store';

import { State } from '../classes/state';
import * as user from '../classes/reducers/user';
import * as client from '../classes/reducers/client';
import * as userActions from '../classes/actions/user';
import * as clientActions from '../classes/actions/client';

import { User } from '../classes/user';
import { ApiResult } from '../classes/api-result';
import { Urls } from '../classes/urls';
import { Storage } from '../classes/storage';

import { Message } from '../classes/message';
import { NotificationService } from './notification.service';


// function get_session_storage(): any {
//   return window.sessionStorage;
// }

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user$: Observable<User>;
  public client$: Observable<{ id: string, name: string }>;

  private _clients: BehaviorSubject<Array<{ id: string, name: string }>> = new BehaviorSubject(Array<{ id: string, name: string }>());
  public clients$: Observable<Array<{ id: string, name: string }>> = this._clients.asObservable();

  private _client_current: BehaviorSubject<{ id: string, name: string}> = new BehaviorSubject({ id: '0', name: 'client' });
  // public client_current$: Observable<{ id: string, name: string }> = this._client_current.asObservable();

  constructor(
    private http: HttpClient,
    private store: Store<State>,
    private storage: Storage,
    private notifications: NotificationService
  ) {
    this.user$ = store.pipe(
      select((state: State) => state.user),
      select((state: user.State) => state.user)
    );
    this.client$ = store.pipe(
      select((state: State) => state.client),
      select((state: client.State) => state.client)
    );
  }

  signin(email: string, password: string): Observable<ApiResult> {
    return Observable.create((observer: NextObserver<ApiResult>) => {
      this.http.post<ApiResult>(Urls.url_user_signin, JSON.stringify({
        email: email,
        password: password
      })).subscribe((r: ApiResult) => {
        if (r.status) {
          const u = new User(
            email,
            []
          );

          const session = this.storage.native_session_storage;
          session.setItem('email', u.email);
          // session.setItem('permissions', JSON.stringify(u.permissions));

          this.store.dispatch(new userActions.SignIn(u));

          this.clients().subscribe((r2: ApiResult) => {
            console.log(r2);
          });
        } else {
          console.error('UserService::signin()', r.messages);
          r.messages.forEach((m: Message) => {
            this.notifications.error(m.text);
          });
        }

        observer.next(r);
        observer.complete();
      }, (error: any) => {
          console.error('UserService::signin()', error);
          this.notifications.error('An unknown error occured');
      });
    });
  }

  signout(): Observable<ApiResult> {
    return Observable.create((observer: NextObserver<ApiResult>) => {
      this.http.post<ApiResult>(Urls.url_user_signout, JSON.stringify({})).subscribe((r: ApiResult) => {
        if (r.status) {
          const session = this.storage.native_session_storage;
          session.clear();

          this.store.dispatch(new userActions.SignOut());
        } else {
          console.error('UserService::signout()', r.messages);
        }

        observer.next(r);
        observer.complete();
      });
    });
  }

  clients(): Observable<ApiResult> {
    return Observable.create((observer: NextObserver<ApiResult>) => {
      this.http.post<ApiResult>(Urls.url_user_clients, JSON.stringify({})).subscribe((r: ApiResult) => {
        if (r.status) {
          const clients: Array<{ id: string, name: string }> = r.data.clients;
          this._clients.next(clients);
        } else {
          console.error('UserService::clients()', r.messages);
        }

        observer.next(r);
        observer.complete();
      });
    });
  }

  client_select(selected_client: { id: string, name: string }): Observable<ApiResult> {
    return Observable.create((observer: NextObserver<ApiResult>) => {
      console.log('selected client', selected_client);
      this.store.dispatch(new clientActions.Select(selected_client));
      this.http.post<ApiResult>(Urls.url_user_client_select, JSON.stringify({
        client_id: selected_client.id
      })).subscribe((r: ApiResult) => {
        if (r.status) {
          this.storage.native_session_storage.setItem('client', JSON.stringify(selected_client));
          // this._client_current.next(client);
          console.log(r);
        } else {
          console.error(r);
        }
      });

      this.http.post<ApiResult>(Urls.url_user_permissions, JSON.stringify({})).subscribe((r: ApiResult) => {
        if (r.status) {
          const permissions = r.data.permissions;
          this.storage.native_session_storage.setItem('permissions', permissions);
          this.store.dispatch(new userActions.PermissionUpdate(permissions));
        } else {
          console.error(r);
        }
      });

      observer.next({
        status: true,
        messages: [],
        data: {}
      });
      observer.complete();
    });
  }

  permissions(): Observable<ApiResult> {
    return this.http.post<ApiResult>(Urls.url_user_permissions, JSON.stringify({}));
  }
}
