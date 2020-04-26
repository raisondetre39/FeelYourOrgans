import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UserListComponent } from './components/user-list/user-list.component';
import { DeviceListComponent } from './components/device-list/device-list.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { NewDeviceComponent } from './components/new-device/new-device.component';
import { ProfileAdminComponent } from './components/profile-admin/profile-admin.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserListService } from './components/user-list/user-list.service';
import { DeviceListService } from './components/device-list/device-list.service';
import { NewDeviceService } from './components/new-device/new-device.service';
import { NewUserService } from './components/new-user/new-user.service';


@NgModule({
  declarations: [
    UserListComponent,
    DeviceListComponent,
    NewUserComponent,
    NewDeviceComponent,
    ProfileAdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
  ],
  providers: [
    UserListService,
    DeviceListService,
    NewDeviceService,
    NewUserService,
  ]
})
export class AdminModule { }
