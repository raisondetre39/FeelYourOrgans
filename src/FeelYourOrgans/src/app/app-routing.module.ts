import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeelYourOrgansComponent } from './feel-your-organs/feel-your-organs.component';
import { AuthGuard } from './guards/auth.guard';
import { Role } from './shared/extension/role';


const routes: Routes = [
  {
    path: '',
    component: FeelYourOrgansComponent,
    children: [
      {
        path: '',
        redirectTo: 'user',
        pathMatch: 'full'
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./feel-your-organs/features/user/user.module').then(m => m.UserModule),
        canActivate: [AuthGuard],
        data: { roles: [Role.User] }
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./feel-your-organs/features/admin/admin.module').then(m => m.AdminModule),
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] }
      },
    ]
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./feel-your-organs/features/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled'
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
