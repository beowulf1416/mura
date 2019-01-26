import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';

import { User } from './classes/user';
import { UserService } from './services/user.service';
import { NotificationService } from './services/notification.service';
import { ClientSelectComponent } from './components/client-select/client-select.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private user$: Observable<User>;

  constructor(
    private title: Title,
    private user_service: UserService,
    private notification_service: NotificationService,
    public router: Router
  ) {
    this.user$ = user_service.user$;
  }

  ngOnInit() {
    this.title.setTitle('Mura');
    this.user$.subscribe((u: User) => {
      console.log('AppComponent::ngOnInit()', u);
    });
  }

  toggle_nav(nav) {
    nav.toggle();
    return false;
  }

  toast_close() {
    console.log('AppComponent::toast_close()');
  }

  client_select() {
    this.router.navigate(['select', 'client']);
  }
}
