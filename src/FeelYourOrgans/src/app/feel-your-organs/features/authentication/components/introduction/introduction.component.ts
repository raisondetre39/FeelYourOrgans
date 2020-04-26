import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthenticationService } from '../../authentication.service';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.css']
})
export class IntroductionComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();
  currentUser: IUser;
  constructor(public dialog: MatDialog,
              private router: Router,
              private authenticationService: AuthenticationService) {
  this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
}

  ngOnInit(): void {
    if (this.currentUser) {
      if (this.currentUser.isAdmin) {
        this.router.navigate(['/admin']);
        return;
       }
      this.router.navigate(['/user']);
      return;
    }
  }

  openAuthDialog(): void {
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.width = '530px';
    const dialogRef = this.dialog.open(LoginComponent, matDialogConfig);
    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
