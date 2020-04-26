import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiLink } from 'src/app/shared/extension/api-links';
import { Observable } from 'rxjs';
import { IFullUserInfo, IUpdateUser } from 'src/app/shared/interfaces/user.interface';

@Injectable({
    providedIn: 'root'
})
export class UpdateUserService {

    private apiLink = ApiLink ;
    constructor(private http: HttpClient) { }

    getUser(userId: number): Observable<IFullUserInfo> {
        return this.http.get<IFullUserInfo>(this.apiLink.userApi + userId);
    }

    updateUser(userId: number, data: IUpdateUser) {
        return this.http.put<IUpdateUser>(this.apiLink.userApi + userId, data);
    }
}
