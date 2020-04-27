import { Injectable } from '@angular/core';
import { ApiLink } from 'src/app/shared/extension/api-links';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOTInfo } from 'src/app/shared/interfaces/iot.interface';
import { IIndicatorInfo } from 'src/app/shared/interfaces/indicator.interface';

@Injectable({
    providedIn: 'root'
})
export class GeneralStatesService {

    private apiLink = ApiLink ;
    constructor(private http: HttpClient) { }

    getDevice(deviceId: number, userId: number): Observable<IOTInfo> {
        return this.http.get<IOTInfo>(this.apiLink.deviceApi + `${deviceId}/user/${userId}`);
    }

    getIndicators(): Observable<IIndicatorInfo[]> {
        return this.http.get<IIndicatorInfo[]>(this.apiLink.indicatorApi);
    }
}
