import { Injectable, ApplicationRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiResult } from '../../../../../classes/api-result';
import { TableSortDirection } from '../../../../../classes/table-operations';
import { ModuleUrls } from '../classes/module-urls';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(
    private http: HttpClient
  ) { }

  clients(
    pager: { items: number, offset: number },
    filter: Array<{ key: string, value: string }>,
    sort: Array<{ key: string, direction: TableSortDirection }>
  ): Observable<ApiResult> {
    return this.http.post<ApiResult>(ModuleUrls.url_clients, JSON.stringify({
      pager: pager,
      filter: filter,
      sort: sort
    }));
  }

  add(name: string, description: string): Observable<ApiResult> {
    return this.http.post<ApiResult>(ModuleUrls.url_client_add, JSON.stringify({
      name: name,
      description: description
    }));
  }
}
