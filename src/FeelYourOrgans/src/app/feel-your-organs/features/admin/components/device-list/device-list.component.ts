import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { DeviceListService } from './device-list.service';
import { ToastrService } from 'ngx-toastr';
import { finalize, takeUntil } from 'rxjs/operators';
import { IOTInfo } from 'src/app/shared/interfaces/iot.interface';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit, OnDestroy {
  devicedeleted = false;
  deviceList: IOTInfo[];

  private destroy$ = new Subject<void>();
  constructor(private deviceListService: DeviceListService,
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
          this.toastr.success('User deleted', 'Success');
        },
        () => {
          this.toastr.error('Something is wrong', 'Error');
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
          this.toastr.error('Something wrong', 'Error');
        }
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
