import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import * as endpoint from '../endpoint';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private _httpClient: HttpClient) { }

  createComment(param: any = {}): Observable<any> {
    return this._httpClient.post(endpoint.comment, param);
  }

  updateComment(param: any = {}, guid: string): Observable<any> {
    return this._httpClient.patch(endpoint.comment + guid + '/', param);
  }

  deleteComment(guid: string): Observable<any> {
    return this._httpClient.delete(endpoint.comment + guid + '/');
  }

  loadComments(param: any = {}): Observable<any> {
    let url = param?.next ? param?.next : endpoint.comment;
    let httpParams = new HttpParams();

    for (let key in param) {
      let value = param[key];

      if (value && value != undefined) {
        if (key != 'next' && key != 'type' && value) {
          httpParams = httpParams.set(key, value);
        }
      }
    }
    
    return this._httpClient.get(url, { params: httpParams });
  }

}
