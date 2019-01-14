import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiResult } from 'src/app/classes/api-result';
import { ModuleUrl } from '../classes/module-url';

@Injectable({
  providedIn: 'root'
})
export class PseService {

  constructor(
    private http: HttpClient
  ) { }

  get_stock_quote(symbol: string, date: Date): Observable<ApiResult> {
    return this.http.get<ApiResult>(ModuleUrl.api_get_stock_quote);
  }
}
