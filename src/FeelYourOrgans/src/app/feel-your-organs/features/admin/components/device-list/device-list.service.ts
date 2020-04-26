import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiLink } from 'src/app/shared/extension/api-links';
import { IOTInfo } from 'src/app/shared/interfaces/iot.interface';

@Injectable({
  providedIn: 'root'
})
export class DeviceListService {

  private apiLink = ApiLink ;
  constructor(private http: HttpClient) { }

  getDevices(): Observable<IOTInfo[]> {
    return this.http.get<IOTInfo[]>(this.apiLink.deviceApi);
  }

  deleteDevice(deviceId: number) {
    return this.http.delete(this.apiLink.deviceApi + deviceId);
  }
}
