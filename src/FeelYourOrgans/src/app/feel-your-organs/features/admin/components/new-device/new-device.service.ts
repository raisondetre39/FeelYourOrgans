import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiLink } from 'src/app/shared/extension/api-links';
import { ILimbInfo } from 'src/app/shared/interfaces/limb.interface';
import { IOTCreate } from 'src/app/shared/interfaces/iot.interface';
import { IIndicatorInfo } from 'src/app/shared/interfaces/indicator.interface';

@Injectable({
  providedIn: 'root'
})
export class NewDeviceService {

  private apiLink = ApiLink ;
  constructor(private http: HttpClient) { }

  getLimbs(): Observable<ILimbInfo[]> {
    return this.http.get<ILimbInfo[]>(this.apiLink.limbApi);
  }

  getIndicators(): Observable<IIndicatorInfo[]> {
    return this.http.get<IIndicatorInfo[]>(this.apiLink.indicatorApi);
  }

  createDevice(form: IOTCreate) {
    return this.http.post(this.apiLink.deviceApi, form);
  }
}
