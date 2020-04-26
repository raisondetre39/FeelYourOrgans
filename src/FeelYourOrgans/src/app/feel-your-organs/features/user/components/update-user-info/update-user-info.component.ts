import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IFullUserInfo, IUser } from 'src/app/shared/interfaces/user.interface';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { UpdateUserService } from './update-user.service';
import { AuthenticationService } from '../../../authentication/authentication.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-update-user-info',
  templateUrl: './update-user-info.component.html',
  styleUrls: ['./update-user-info.component.css']
})
export class UpdateUserInfoComponent implements OnInit , OnDestroy {

  userForm: FormGroup;
  userInfo: IFullUserInfo;
  loading = false;
  currentUser: IUser;
  private destroy$ = new Subject<void>();
  constructor(private updateUserService: UpdateUserService,
              private toastr: ToastrService,
              private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.createForm();
    this.getUserInfo();
  }

  getUserInfo() {
    this.updateUserService.getUser(this.currentUser.userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res) => {
          this.userInfo = res;
          this.initForm();
        }
      );
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.loading = true;
      this.updateUser();
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  initForm(): void {
    this.userForm.get('email').setValue(this.userInfo.email);
    this.userForm.get('firstName').setValue(this.userInfo.firstName);
    this.userForm.get('lastName').setValue(this.userInfo.lastName);
  }

  createForm(): void  {
    this.userForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
    });
  }

  updateUser(): void {
    this.updateUserService.updateUser(this.userInfo.id, this.userForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          this.loading = false;
          this.toastr.success(`User profile updated`, `Success`);
          window.location.reload();
        },
        () => {
          this.loading = false;
          this.toastr.error(`Something else`, `Error`);
        }
      );
  }

  resetForm(): void {
    if (!this.loading) {
      this.userForm.reset();
    }
  }

  hasCustomError = (form: FormGroup, control: string): boolean =>
  form.get(`${control}`).invalid && (form.get(`${control}`).dirty || form.get(`${control}`).touched)

  hasPatternError = (form: FormGroup, control: string): boolean =>
    (form.get(`${control}`).invalid && form.get(`${control}`).dirty)

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}

