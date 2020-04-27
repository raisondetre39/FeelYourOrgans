import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { GeneralStatesService } from './general-state.service';
import { UserService } from 'src/app/shared/services/user.service';
import { AuthenticationService } from '../../../authentication/authentication.service';
import { IOTInfo } from 'src/app/shared/interfaces/iot.interface';
import { IFullUserInfo, IUser } from 'src/app/shared/interfaces/user.interface';
import { takeUntil } from 'rxjs/operators';
import { IIndicatorInfo } from 'src/app/shared/interfaces/indicator.interface';

@Component({
  selector: 'app-general-state',
  templateUrl: './general-state.component.html',
  styleUrls: ['./general-state.component.css']
})
export class GeneralStateComponent implements OnInit, OnDestroy {

  currentUser: IUser;
  fullUserInfo: IFullUserInfo;
  deviceIndicator: IOTInfo;
  indificators: IIndicatorInfo[];

  private destroy$ = new Subject<void>();
  constructor(private analyticsService: GeneralStatesService,
              private userService: UserService,
              private authenticationService: AuthenticationService) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.getIndicators();
    this.getUserInfo();
  }

  getIndicators(): void {
    this.analyticsService.getIndicators()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => this.indificators = data);
  }

  getUserInfo(): void {
    this.userService.getUser(this.currentUser.userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.fullUserInfo = res;
        this.getDeviceInfo();
      });
  }

  getDeviceInfo(): void {
    this.analyticsService.getDevice(this.fullUserInfo.iotId, this.fullUserInfo.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res) => {
          this.deviceIndicator = res;
        },
        () => {
        }
      );
  }

  getActualValue(indicatorId: number): string {
    const records = this.deviceIndicator.iotIndicators.find(x => x.id === indicatorId)
    .records;

    return Math.max.apply(Math, records.map(o => o.value));
  }

  spinnerStyle(indicatorId: number) {
    const isCritical = this.deviceIndicator.iotIndicators.find(x => x.id === indicatorId)
    .records.some(x => x.isCritical === false);


    return isCritical;
  }

  getIndicatorName(indicatorId: number): string {
    if (indicatorId !== null && indicatorId !== undefined) {
      return this.indificators.find(x => x.id === indicatorId).name;
    }
    return '';
  }

  getIndicatorDescription(indicatorId: number): string {
    if (indicatorId !== null && indicatorId !== undefined) {
      return this.indificators.find(x => x.id === indicatorId).description;
    }
    return '';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
