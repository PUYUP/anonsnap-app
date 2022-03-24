import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import * as endpoint from '../endpoint';

@Injectable({
  providedIn: 'root'
})
export class ReactionService {

  constructor(private httpClient: HttpClient) { }

  createReaction(param: any = {}): Observable<any> {
    return this.httpClient.post(endpoint.reaction, param);
  }

  deleteReaction(guid: string): Observable<any> {
    return this.httpClient.delete(endpoint.reaction + guid + '/');
  }
  
}
