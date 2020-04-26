import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthenticationService } from '../../../authentication/authentication.service';
import { UserService } from 'src/app/shared/services/user.service';
import { IUser, IFullUserInfo } from 'src/app/shared/interfaces/user.interface';
import { takeUntil } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewDeviceComponent } from '../new-device/new-device.component';
import { NewUserComponent } from '../new-user/new-user.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrls: ['./profile-admin.component.css']
})
export class ProfileAdminComponent implements OnInit, OnDestroy {

  currentUser: IUser;
  userInfo: IFullUserInfo;
  userList = true;
  deviceList = false;
  private destroy$ = new Subject<void>();
  constructor(public  translateService: TranslateService,
              public dialog: MatDialog,
              private authenticationService: AuthenticationService,
              private userService: UserService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo() {
    this.userService.getUser(this.currentUser.userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => this.userInfo = res);
  }

  getListUser() {
    this.deviceList = false;
    this.userList = true;
  }

  getDeviceList() {
    this.deviceList = true;
    this.userList = false;
  }

  openCreateDialog() {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.backdropClass = 'backdropBackground';
    matDialogConfig.width = '600px';
    const dialogRef = this.dialog.open(NewUserComponent, matDialogConfig);
    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => window.location.reload());
  }

  openCreateDeviceDialog(): void {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.backdropClass = 'backdropBackground';
    matDialogConfig.width = '600px';
    const dialogRef = this.dialog.open(NewDeviceComponent, matDialogConfig);
    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => window.location.reload());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
