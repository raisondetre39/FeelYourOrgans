import { Component, OnInit, OnDestroy } from '@angular/core';
import { IUser, IFullUserInfo } from 'src/app/shared/interfaces/user.interface';
import { Subject } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthenticationService } from '../../../authentication/authentication.service';
import { UserService } from 'src/app/shared/services/user.service';
import { takeUntil } from 'rxjs/operators';
import { UpdateUserInfoComponent } from '../update-user-info/update-user-info.component';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit, OnDestroy {

  currentUser: IUser;
  userInfo: IFullUserInfo;
  graphs = false;
  states = true;
  private destroy$ = new Subject<void>();
  constructor(public dialog: MatDialog,
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

  getGraphs() {
    this.graphs = true;
    this.states = false;
  }

  getStates() {
    this.graphs = false;
    this.states = true;
  }

  openDialogProfile() {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.backdropClass = 'backdropBackground';
    matDialogConfig.width = '600px';
    const dialogRef = this.dialog.open(UpdateUserInfoComponent, matDialogConfig);
    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => window.location.reload());
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
