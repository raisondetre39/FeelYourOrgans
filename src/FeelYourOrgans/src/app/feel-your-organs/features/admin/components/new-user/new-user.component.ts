import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { IOTInfo } from 'src/app/shared/interfaces/iot.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NewUserService } from './new-user.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit, OnDestroy {

  userForm: FormGroup;
  deviceList: IOTInfo[];
  loading = false;
  private destroy$ = new Subject<void>();
  constructor(public  translateService: TranslateService,
              private newUserService: NewUserService,
              private toastr: ToastrService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getDevices();
    this.createForm();
  }

  getDevices(): void {
    this.newUserService.getIots()
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

  onSubmit(): void {
    if (this.userForm.valid) {
      this.loading = true;
      this.postDevice();
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  postDevice(): void {
    this.newUserService.createDevice({
      password: 'String1234',
      ...this.userForm.value
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          this.loading = false;
          this.resetForm();
          this.toastr.success(this.translateService.instant('User-Created'), this.translateService.instant('Success'));
        },
        () => {
          this.loading = false;
          this.toastr.error(this.translateService.instant('Something-Is-Wrong'), this.translateService.instant('Error'));
        }
      );
  }

  createForm(): void  {
    this.userForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      iotId: [null, Validators.required]
    });
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
