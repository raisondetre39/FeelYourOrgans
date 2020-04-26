import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFullUserInfo } from 'src/app/shared/interfaces/user.interface';
import { ApiLink } from 'src/app/shared/extension/api-links';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  private apiLink = ApiLink ;
  constructor(private http: HttpClient) { }

  getUsers(): Observable<IFullUserInfo[]> {
    return this.http.get<IFullUserInfo[]>(this.apiLink.userApi);
  }

  deleteUser(userId: number) {
    return this.http.delete(this.apiLink.userApi + userId);
  }
}
