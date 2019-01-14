import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiResult } from '../../../../classes/api-result';
import { ModuleUrls } from '../classes/module-urls';


@Injectable({
  providedIn: 'root'
})
export class ForgotPwService {

  constructor(
    private http: HttpClient
  ) { }

  request(email: string): Observable<ApiResult> {
    return this.http.post<ApiResult>(ModuleUrls.url_user_password_request, JSON.stringify({
      email: email
    }));
  }

  validate_token(token: string): Observable<ApiResult> {
    return this.http.post<ApiResult>(ModuleUrls.url_user_password_token_validate, JSON.stringify({
      token: token
    }));
  }

  reset(token: string, password: string): Observable<ApiResult> {
    return this.http.post<ApiResult>(ModuleUrls.url_user_password_reset, JSON.stringify({
      token: token,
      password: password
    }));
  }
}
