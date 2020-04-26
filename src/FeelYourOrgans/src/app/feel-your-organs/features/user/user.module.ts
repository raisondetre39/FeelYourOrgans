import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ProfileUserComponent } from './components/profile-user/profile-user.component';
import { GeneralStateComponent } from './components/general-state/general-state.component';
import { GraphsComponent } from './components/graphs/graphs.component';
import { UpdateUserInfoComponent } from './components/update-user-info/update-user-info.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UpdateUserService } from './components/update-user-info/update-user.service';
import { GraphsService } from './components/graphs/graphs.service';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [ProfileUserComponent, GeneralStateComponent, GraphsComponent, UpdateUserInfoComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    ChartsModule
  ],
  providers: [GraphsService, UpdateUserService]
})
export class UserModule { }
