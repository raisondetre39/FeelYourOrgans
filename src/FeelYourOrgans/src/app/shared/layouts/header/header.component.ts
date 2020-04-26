import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { shareReplay, map, takeUntil } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { IUser, IFullUserInfo } from '../../interfaces/user.interface';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/feel-your-organs/features/authentication/authentication.service';
import { Role } from '../../extension/role';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  currentUser: IUser;
  userData: IFullUserInfo;
  private destroy$ = new Subject<void>();
  constructor(private router: Router,
              private breakpointObserver: BreakpointObserver,
              private authenticationService: AuthenticationService,
              private userService: UserService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
  }

  getUserInfo(): void {
    this.userService.getUser(this.currentUser.userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => this.userData = data);
  }

  userAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}

