import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { SecurityService } from '../../services/security.service';
import { TableSortDirection } from '../../../../../../classes/table-operations';
import { ApiResult } from 'src/app/classes/api-result';
import { NotificationService } from 'src/app/services/notification.service';
import { Message } from 'src/app/classes/message';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users = [];

  pager = {
    items: 10,
    offset: 0,
    max_items: 0
  };
  filter = [];
  sort = [{ key: 'id', direction: TableSortDirection.NONE }];

  constructor(
    private title: Title,
    private security: SecurityService,
    private notification: NotificationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.title.setTitle('Users');
    this.refresh();
  }

  refresh() {
    this.security.users(
      this.pager,
      this.filter,
      this.sort
    ).subscribe((r: ApiResult) => {
      if (r.status) {
        this.users = r.data.users;
        this.pager.max_items = this.users.length;
      } else {
        r.messages.forEach((m: Message) => {
          this.notification.error(m.text);
        });
      }
    });
  }

  user_new() {
    this.router.navigate(['admin', 'security', 'users', 'new']);
  }

  pager_previous() {
    console.log('UserListComponent::pager_previous()');
    this.pager.offset = this.pager.offset - this.pager.items;
    if (this.pager.offset < 0) {
      this.pager.offset = 0;
    }
  }

  pager_next() {
    console.log('UserListComponent::pager_next()');
    this.pager.offset = this.pager.offset + this.pager.items;
  }
}
