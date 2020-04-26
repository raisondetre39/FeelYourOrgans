import { Component, OnInit } from '@angular/core';
import { IUser } from '../shared/interfaces/user.interface';
import { Router } from '@angular/router';
import { AuthenticationService } from './features/authentication/authentication.service';

@Component({
  selector: 'app-feel-your-organs',
  templateUrl: './feel-your-organs.component.html',
  styleUrls: ['./feel-your-organs.component.css']
})
export class FeelYourOrgansComponent implements OnInit {

  currentUser: IUser;

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    /*if (!this.userAuthenticated()) {
      this.router.navigate(['/login']);
    }*/
  }

  userAuthenticated(): boolean {
    return this.currentUser !== null;
  }

}
