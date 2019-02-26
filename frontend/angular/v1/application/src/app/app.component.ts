import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';

import { User } from './classes/user';
import { UserService } from './services/user.service';
import { NotificationService } from './services/notification.service';
import { ClientSelectComponent } from './components/client-select/client-select.component';
import { Router } from '@angular/router';
import { ApiResult } from './classes/api-result';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private user$: Observable<User>;
  private client$: Observable<{ id: string, name: string }>;

  private clients$: Observable<Array<{ id: string, name: string }>>;
  // private client_current$: Observable<{ id: string, name: string }>;

  constructor(
    private title: Title,
    private user_service: UserService,
    private notification_service: NotificationService,
    public router: Router
  ) {
    this.user$ = user_service.user$;
    this.client$ = user_service.client$;
    this.clients$ = user_service.clients$;
    // this.client_current$ = user_service.client_current$;
  }

  ngOnInit() {
    this.title.setTitle('Mura');
    // this.user$.subscribe((u: User) => {
    //   console.log('AppComponent::ngOnInit()', u);
    // });
  }

  toggle_nav(nav) {
    nav.toggle();
    return false;
  }

  toast_close() {
    console.log('AppComponent::toast_close()');
  }

  user_client_select(client: { id: string, name: string}) {
    this.user_service.client_select(client).subscribe((r: ApiResult) => {
      if (r.status) {
        console.log('AppComponent::user_client_select', r.data);
      } else {
        console.log(r.messages);
      }
    });
    return false;
  }
}
