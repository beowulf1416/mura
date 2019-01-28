import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ApiResult } from 'src/app/classes/api-result';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl } from '@angular/forms';

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
    private user_service: UserService
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
    console.log(this.form.get('clients').get('clients').value);
    return false;
  }

}
