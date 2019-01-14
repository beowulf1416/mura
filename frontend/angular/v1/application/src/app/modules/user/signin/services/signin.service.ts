import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ApiResult } from 'src/app/classes/api-result';
import { ModuleUrls } from '../classes/module-urls';
import { UserService } from 'src/app/services/user.service';


@Injectable({
  providedIn: 'root'
})
export class SigninService {

  constructor(
    private http: HttpClient,
    private user_service: UserService
  ) { }

  signin(email: string, password: string): Observable<ApiResult> {
    return this.user_service.signin(email, password);
  }
}
