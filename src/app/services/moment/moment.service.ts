import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import * as endpoint from '../endpoint';

@Injectable({
  providedIn: 'root'
})
export class MomentService {

  constructor(private _httpClient: HttpClient) { }

  createMoment(param: any = {}): Observable<any> {
    return this._httpClient.post(endpoint.moment, param);
  }

  updateMoment(param: any = {}, guid: string): Observable<any> {
    return this._httpClient.patch(endpoint.moment + guid + '/', param);
  }

  deleteMoment(guid: string): Observable<any> {
    return this._httpClient.delete(endpoint.moment + guid + '/');
  }

  loadMoments(param: any = {}): Observable<any> {
    let url = param?.next ? param?.next : endpoint.moment;
    let httpParams = new HttpParams();

    for (let key in param) {
      let value = param[key];

      if (value && value != undefined && value != '') {
        if (key != 'next' && key != 'type' && value) {
          httpParams = httpParams.set(key, value);
        }
      }
    }
    
    return this._httpClient.get(url, { params: httpParams });
  }

  loadTags(param: any = {}): Observable<any> {
    let url = param?.next ? param?.next : endpoint.tags;
    let httpParams = new HttpParams();

    for (let key in param) {
      let value = param[key];

      if (value && value != undefined && value != '') {
        if (key != 'next' && key != 'type' && value) {
          httpParams = httpParams.set(key, value);
        }
      }
    }
    
    return this._httpClient.get(url, { params: httpParams });
  }
}
