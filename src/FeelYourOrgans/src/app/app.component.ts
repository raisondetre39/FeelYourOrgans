import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private currentUserSubject: BehaviorSubject<string>;
  public currentUser: Observable<string>;
  constructor(private translate: TranslateService) {
    this.currentUserSubject = new BehaviorSubject<string>(localStorage.getItem('localization'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }
  ngOnInit(): void {
    if (!this.currentUserValue) {
      this.localizationEN();
    }
    this.translate.use(this.currentUserValue);
  }

  localizationUA() {
    localStorage.setItem('localization', 'ua');
    this.currentUserSubject.next('ua');
    this.translate.use(this.currentUserValue);
  }

  localizationEN() {
    localStorage.setItem('localization', 'en');
    this.currentUserSubject.next('en');
    this.translate.use(this.currentUserValue);
  }

}
