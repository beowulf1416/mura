import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';
import { ApiResult } from 'src/app/classes/api-result';
import { State } from '../../classes/state';

import * as client from '../../classes/actions/client';

@Component({
  selector: 'app-client-select',
  templateUrl: './client-select.component.html',
  styleUrls: ['./client-select.component.css']
})
export class ClientSelectComponent implements OnInit {

  clients = [];

  form = new FormGroup({
    clients: new FormGroup({
      clients: new FormControl('', {})
    })
  });

  constructor(
    private title: Title,
    private user_service: UserService,
    private store: Store<State>,
    private router: Router
  ) { }

  ngOnInit() {
    this.title.setTitle('Client Select');
    this.user_service.clients().subscribe((r: ApiResult) => {
      if (r.status) {
        this.clients = r.data.clients;
      } else {
        console.error(r);
      }
    });
  }

  submit() {
    console.log('ClientSelectComponent.submit()');
    const c = this.form.get('clients').get('clients').value;
    // this.store.dispatch(new client.Select(c.id));
    this.user_service.client_select(c.id).subscribe((r: ApiResult) => {
      console.log(r);
    });

    this.router.navigate(['']);
    return false;
  }

}
