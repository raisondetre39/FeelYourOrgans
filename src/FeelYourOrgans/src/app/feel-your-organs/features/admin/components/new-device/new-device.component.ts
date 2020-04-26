import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ILimbInfo } from 'src/app/shared/interfaces/limb.interface';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NewDeviceService } from './new-device.service';
import { takeUntil } from 'rxjs/operators';
import { IIndicatorInfo } from 'src/app/shared/interfaces/indicator.interface';

@Component({
  selector: 'app-new-device',
  templateUrl: './new-device.component.html',
  styleUrls: ['./new-device.component.css']
})
export class NewDeviceComponent implements OnInit, OnDestroy {

  deviceForm: FormGroup;
  limbs: ILimbInfo[];
  indicators: IIndicatorInfo[];
  loading = false;
  private destroy$ = new Subject<void>();
  constructor(private newDeviceService: NewDeviceService,
              private toastr: ToastrService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getLimbs();
    this.getIndicators();
    this.createForm();
  }

  getLimbs(): void {
    this.newDeviceService.getLimbs()
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      res => {
        this.limbs = res;
      },
      () => {
        this.toastr.error(`Something else`);
      }
    );
  }

  getIndicators(): void {
    this.newDeviceService.getIndicators()
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      res => {
        this.indicators = res;
      },
      () => {
        this.toastr.error(`Something else`);
      }
    );
  }

  onSubmit(): void {
    if (this.deviceForm.valid) {
      this.loading = true;
      this.postDevice();
    } else {
      this.deviceForm.markAllAsTouched();
    }
  }

  postDevice(): void {
    this.newDeviceService.createDevice(this.deviceForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          this.loading = false;
          this.resetForm();
          this.toastr.success(`Device created`, `Success`);
        },
        () => {
          this.loading = false;
          this.toastr.error(`Something is wrong`, `Error`);
        }
      );
  }

  createForm(): void  {
    this.deviceForm = this.formBuilder.group({
      name: [null, Validators.required],
      limbId: [null, Validators.required],
      indicatorIds: [null, Validators.required],
    });
  }

  resetForm(): void {
    if (!this.loading) {
      this.deviceForm.reset();
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
