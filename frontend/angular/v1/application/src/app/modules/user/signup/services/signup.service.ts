import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiResult } from '../../../../classes/api-result';
import { ModuleUrls } from '../classes/module-urls';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(
    private http: HttpClient
  ) { }

  register(email: string, password: string): Observable<ApiResult> {
    return this.http.post<ApiResult>(ModuleUrls.url_user_register, JSON.stringify({
      email: email,
      password: password
    }));
  }

  verify(token: string): Observable<ApiResult> {
    return this.http.post<ApiResult>(ModuleUrls.url_user_verify, JSON.stringify({
      token: token
    }));
  }
}
