import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiLink } from 'src/app/shared/extension/api-links';
import { IOTInfo } from 'src/app/shared/interfaces/iot.interface';
import { ICreateUser } from 'src/app/shared/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class NewUserService {

  private apiLink = ApiLink ;
  constructor(private http: HttpClient) { }

  getIots(): Observable<IOTInfo[]> {
    return this.http.get<IOTInfo[]>(this.apiLink.deviceApi);
  }

  createDevice(user: ICreateUser) {
    return this.http.post(this.apiLink.userApi, user);
  }
}
