import { Component, OnInit, OnDestroy } from '@angular/core';
import { IUserInfo, IFullUserInfo } from 'src/app/shared/interfaces/user.interface';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { UserListService } from './user-list.service';
import { takeUntil, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
  userdeleted = false;
  userList: IFullUserInfo[];

  private destroy$ = new Subject<void>();
  constructor(private userListService: UserListService,
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
          this.toastr.success('User deleted', 'Success');
        },
        () => {
          this.toastr.error('Something is wrong', 'Error');
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
          this.toastr.error('Something wrong', 'Error');
        }
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
