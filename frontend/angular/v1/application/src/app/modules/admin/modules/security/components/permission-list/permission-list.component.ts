import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { TableSortDirection } from '../../../../../../classes/table-operations';
import { SecurityService } from '../../services/security.service';
import { ApiResult } from 'src/app/classes/api-result';
import { Message } from 'src/app/classes/message';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-permission-list',
  templateUrl: './permission-list.component.html',
  styleUrls: ['./permission-list.component.css']
})
export class PermissionListComponent implements OnInit {

  permissions = [];

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
    this.title.setTitle('Permissions');
  }

  refresh() {
    console.log('PermissionListComponent.refresh()');
    this.security.permissions(this.pager, this.filter, this.sort).subscribe((r: ApiResult) => {
      if (r.status) {
        this.permissions = r.data.permissions;
      } else {
        r.messages.forEach((m: Message) => {
          this.notification.error(m.text);
        });
      }
    });
  }

  permission_new() {
    console.log('PermissionListComponent.permission_new()');
  }
}
