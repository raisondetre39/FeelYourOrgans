import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiLink } from 'src/app/shared/extension/api-links';
import { Observable } from 'rxjs';
import { IOTInfo } from 'src/app/shared/interfaces/iot.interface';
import { IIndicatorInfo } from 'src/app/shared/interfaces/indicator.interface';

@Injectable({
    providedIn: 'root'
})
export class GraphsService {

    private apiLink = ApiLink ;
    constructor(private http: HttpClient) { }

    getDevice(deviceId: number, userId: number): Observable<IOTInfo> {
        return this.http.get<IOTInfo>(this.apiLink.deviceApi + `${deviceId}/user/${userId}`);
    }

    getIndicators(): Observable<IIndicatorInfo[]> {
        return this.http.get<IIndicatorInfo[]>(this.apiLink.indicatorApi);
    }
}
