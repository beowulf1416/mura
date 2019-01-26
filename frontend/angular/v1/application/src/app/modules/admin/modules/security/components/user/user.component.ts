import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { SecurityService } from '../../services/security.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ApiResult } from 'src/app/classes/api-result';
import { NotificationService } from 'src/app/services/notification.service';
import { Message } from 'src/app/classes/message';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user = {
    id: '',
    active: false,
    created: new Date(),
    verified: new Date(),
    email: '',
    last_signed: new Date()
  };

  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
  });

  constructor(
    private title: Title,
    private security: SecurityService,
    private notification: NotificationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.title.setTitle('User');
    this.route.paramMap.subscribe((p: ParamMap) => {
      const id = p.get('id');
      this.security.user(id).subscribe((r: ApiResult) => {
        if (r.status) {
          this.user = r.data.user;
        } else {
          r.messages.forEach((m: Message) => {
            this.notification.error(m.text);
          });
        }
      });
    });
  }

  back() {
    this.router.navigate(['admin', 'security', 'users']);
  }

  save() {
    console.log('UserComponent::save()');
  }
}
