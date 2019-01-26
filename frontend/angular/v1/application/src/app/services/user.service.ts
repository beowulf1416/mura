import { Injectable } from '@angular/core';
import { Observable, observable, NextObserver } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Store, select } from '@ngrx/store';

import { State } from '../classes/state';
import * as user from '../classes/reducers/user';
import * as userActions from '../classes/actions/user';
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
            r.data.permissions
          );

          // const session = get_session_storage();
          const session = this.storage.native_session_storage;
          session.setItem('email', u.email);
          session.setItem('permissions', JSON.stringify(u.permissions));

          this.store.dispatch(new userActions.SignIn(u));
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
    return this.http.post<ApiResult>(Urls.url_user_clients, JSON.stringify({}));
  }
}
