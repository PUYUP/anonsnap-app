import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import * as endpoint from '../endpoint';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _httpClient: HttpClient) { }

  storeUserSession(data: any) {
    localStorage.setItem('user', JSON.stringify(data));
  }

  updateUserData(newUserData: any) {
    let ses = this.getUserSession;
    if (ses) {
      let updateData = {
        ...ses,
        user: {
          ...newUserData
        }
      }

      this.storeUserSession(updateData);
    }
  }

  get getUserSession() {
    let ses = localStorage.getItem('user');
    return ses ? JSON.parse(ses) : null;
  }

  get getUserToken() {
    let ses = this.getUserSession;
    return ses ? ses?.token : null;
  }

  get isUserSigned() {
    return this.getUserToken ? true : false;
  }

  private deleteUserSession() {
    localStorage.removeItem('user');
  }

  signin(param: any = {}): Observable<any> {
    return this._httpClient.post(endpoint.userToken, param);
  }

  signup(param: any = {}): Observable<any> {
    return this._httpClient.post(endpoint.user, param);
  }

  signout(): any {
    return this.deleteUserSession();
  }

  userUpdate(param: any = {}): Observable<any> {
    let ses = this.getUserSession;
    return this._httpClient.patch(endpoint.user + ses?.user?.hexid + '/', param);
  }

  changePassword(param: any = {}): Observable<any> {
    let ses = this.getUserSession;
    return this._httpClient.patch(endpoint.user + ses?.user?.hexid + '/change-password/', param);
  }

  lostPassword(param: any = {}): Observable<any> {
    return this._httpClient.post(endpoint.userRequestResetPassword, param);
  }

  confirmLostPassword(param: any = {}): Observable<any> {
    return this._httpClient.post(endpoint.userConfirmResetPassword, param);
  }

}
