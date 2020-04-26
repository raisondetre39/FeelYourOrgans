import { Component, OnInit, OnDestroy } from '@angular/core';
import { IUserInfo, IFullUserInfo } from 'src/app/shared/interfaces/user.interface';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { UserListService } from './user-list.service';
import { takeUntil, finalize } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
  userdeleted = false;
  userList: IFullUserInfo[];

  private destroy$ = new Subject<void>();
  constructor(public  translateService: TranslateService,
              private userListService: UserListService,
              public toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUserList();
  }

  deleteUser(userId: number) {
    this.userdeleted = true;
    this.userListService.deleteUser(userId)
      .pipe(
        finalize(() => {
          this.userdeleted = false;
          this.getUserList();
        }),
        takeUntil(this.destroy$))
      .subscribe(
        () => {
          this.toastr.success(this.translateService.instant('User-Deleted'), this.translateService.instant('Success'));
        },
        () => {
          this.toastr.error(this.translateService.instant('Something-Is-Wrong'), this.translateService.instant('Error'));
        }
      );
  }

  getUserList() {
    this.userListService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        res => {
          this.userList = res;
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
