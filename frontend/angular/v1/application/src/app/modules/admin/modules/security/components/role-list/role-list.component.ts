import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { SecurityService } from '../../services/security.service';
import { TableSortDirection } from '../../../../../../classes/table-operations';
import { ApiResult } from 'src/app/classes/api-result';
import { NotificationService } from 'src/app/services/notification.service';
import { Message } from 'src/app/classes/message';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {

  roles = [];

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
    this.title.setTitle('Roles');
    this.refresh();
  }

  refresh() {
    this.security.roles(
      this.pager,
      this.filter,
      this.sort
    ).subscribe((r: ApiResult) => {
      if (r.status) {
        this.roles = r.data.roles;
        this.pager.max_items = this.roles.length;
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
    console.log('RoleListComponent::pager_previous()');
    this.pager.offset = this.pager.offset - this.pager.items;
    if (this.pager.offset < 0) {
      this.pager.offset = 0;
    }
  }

  pager_next() {
    console.log('RoleListComponent::pager_next()');
    this.pager.offset = this.pager.offset + this.pager.items;
  }

}
