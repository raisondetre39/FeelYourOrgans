import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { IntroductionComponent } from './components/introduction/introduction.component';


@NgModule({
  declarations: [LoginComponent, IntroductionComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    SharedModule,
  ],
  providers: [
  ]
})
export class AuthenticationModule { }
