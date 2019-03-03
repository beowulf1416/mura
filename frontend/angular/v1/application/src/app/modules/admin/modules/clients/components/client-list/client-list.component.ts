import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ClientsService } from '../../services/clients.service';
import { TableSortDirection } from '../../../../../../classes/table-operations';
import { ApiResult } from 'src/app/classes/api-result';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  clients = [];

  pager = {
    items: 10,
    offset: 0
  };
  filter = [];
  sort = [{ key: 'id', direction: TableSortDirection.NONE }];

  constructor(
    private title: Title,
    private service: ClientsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.title.setTitle('Clients');
    this.refresh();
  }

  refresh() {
    this.service.clients(
      this.pager,
      this.filter,
      this.sort
    ).subscribe((r: ApiResult) => {
      if (r.status) {
        console.log('ClientListComponent::refresh()');
        this.clients = r.data.clients;
      } else {
        console.error('ClientListComponent::refresh()', r.messages);
      }
    });
  }

  client_add() {
    console.log('ClientListComponent::client_add()');
    this.router.navigate(['admin', 'clients', 'add']);
  }
}
