import { Injectable } from '@angular/core';
import { ApiLink } from '../extension/api-links';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFullUserInfo } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiLink = ApiLink ;
  constructor(private http: HttpClient) { }

  getUser(userId: number): Observable<IFullUserInfo> {
    return this.http.get<IFullUserInfo>(this.apiLink.userApi + userId);
  }

}
