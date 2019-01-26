import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiResult } from 'src/app/classes/api-result';
import { ModuleUrls } from '../classes/module-urls';
import { TableSortDirection } from '../../../../../classes/table-operations';


@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(
    private http: HttpClient
  ) { }

  users(
    pager: { items: number, offset: number },
    filter: Array<{ key: string, value: string }>,
    sort: Array<{ key: string, direction: TableSortDirection }>
  ): Observable<ApiResult> {
    return this.http.post<ApiResult>(ModuleUrls.url_security_users, JSON.stringify({
      pager: pager,
      filter: filter,
      sort: sort
    }));
  }

  user(user_id: string): Observable<ApiResult> {
    return this.http.post<ApiResult>(ModuleUrls.url_security_user, JSON.stringify({
      user_id: user_id
    }));
  }
}
