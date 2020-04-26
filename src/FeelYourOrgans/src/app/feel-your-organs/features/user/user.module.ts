import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ProfileUserComponent } from './components/profile-user/profile-user.component';
import { GeneralStateComponent } from './components/general-state/general-state.component';
import { GraphsComponent } from './components/graphs/graphs.component';
import { UpdateUserInfoComponent } from './components/update-user-info/update-user-info.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ProfileUserComponent, GeneralStateComponent, GraphsComponent, UpdateUserInfoComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
