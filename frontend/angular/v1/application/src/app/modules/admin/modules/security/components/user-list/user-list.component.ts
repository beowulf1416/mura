import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { SecurityService } from '../../services/security.service';
import { TableSortDirection } from '../../../../../../classes/table-operations';
import { ApiResult } from 'src/app/classes/api-result';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  roles = [];

  pager = {
    items: 10,
    offset: 0
  };
  filter = [];
  sort = [{ key: 'id', direction: TableSortDirection.NONE }];

  constructor(
    private title: Title,
    private security: SecurityService
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
      console.log('UserListComponent::refresh()', r);
    });
  }
}
