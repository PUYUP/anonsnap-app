import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import * as endpoint from '../endpoint';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private httpClient: HttpClient) { }

  validateVerification(param: any = {}, passcode: string): Observable<any> {
    return this.httpClient.patch(endpoint.verification + passcode + '/', param);
  }
  
}
