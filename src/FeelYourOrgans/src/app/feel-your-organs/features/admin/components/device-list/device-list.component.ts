import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { DeviceListService } from './device-list.service';
import { ToastrService } from 'ngx-toastr';
import { finalize, takeUntil } from 'rxjs/operators';
import { IOTInfo } from 'src/app/shared/interfaces/iot.interface';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit, OnDestroy {
  devicedeleted = false;
  deviceList: IOTInfo[];

  private destroy$ = new Subject<void>();
  constructor(public  translateService: TranslateService,
              private deviceListService: DeviceListService,
              public toastr: ToastrService) { }

  ngOnInit(): void {
    this.getDeviceList();
  }

  deleteDevice(deviceId: number) {
    this.devicedeleted = true;
    this.deviceListService.deleteDevice(deviceId)
      .pipe(
        finalize(() => {
          this.devicedeleted = false;
          this.getDeviceList();
        }),
        takeUntil(this.destroy$))
      .subscribe(
        () => {
          this.toastr.success(this.translateService.instant('Device-List-Toastr.Deleted'), this.translateService.instant('Success'));
        },
        () => {
          this.toastr.error(this.translateService.instant('Something-Is-Wrong'), this.translateService.instant('Error'));
        }
      );
  }

  getDeviceList() {
    this.deviceListService.getDevices()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        res => {
          this.deviceList = res;
        },
        () => {
          this.toastr.error(this.translateService.instant('Something-Is-Wrong'), this.translateService.instant('Error'));
        }
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
