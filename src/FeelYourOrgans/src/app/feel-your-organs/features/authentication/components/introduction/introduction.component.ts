import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.css']
})
export class IntroductionComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
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
