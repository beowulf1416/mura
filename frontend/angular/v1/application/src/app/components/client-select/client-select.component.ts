import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ApiResult } from 'src/app/classes/api-result';

@Component({
  selector: 'app-client-select',
  templateUrl: './client-select.component.html',
  styleUrls: ['./client-select.component.css']
})
export class ClientSelectComponent implements OnInit {

  clients = [];

  constructor(
    private user_service: UserService
  ) { }

  ngOnInit() {
    this.user_service.clients().subscribe((r: ApiResult) => {
      if (r.status) {
        this.clients = r.data.clients;
      } else {
        console.error(r);
      }
    });
  }

}
