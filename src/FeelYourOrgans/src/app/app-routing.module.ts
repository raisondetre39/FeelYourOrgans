import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeelYourOrgansComponent } from './feel-your-organs/feel-your-organs.component';


const routes: Routes = [
  {
    path: '',
    component: FeelYourOrgansComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./feel-your-organs/features/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./feel-your-organs/features/user/user.module').then(m => m.UserModule)
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./feel-your-organs/features/admin/admin.module').then(m => m.AdminModule)
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
