import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { ClientsService } from '../../services/clients.service';
import { ApiResult } from 'src/app/classes/api-result';
import { Message } from 'src/app/classes/message';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  client = {
    id: 0,
    active: false,
    created: Date(),
    name: '',
    description: ''
  };
  messages = Array<String>();

  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    description: new FormControl('')
  });

  constructor(
    private title: Title,
    private service: ClientsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.title.setTitle('Client');
    this.route.paramMap.subscribe((p: ParamMap) => {
      const id = p.get('id');
      console.log('ClientComponent;;ngOnInit()', id);
      if (id != null) {
        this.service.view(Number.parseInt(id, 10)).subscribe((r: ApiResult) => {
          if (r.status) {
            this.client = r.data.client;
            this.form.get('name').setValue(this.client.name);
            this.form.get('description').setValue(this.client.description);
          } else {
            console.error('ClientComponent::ngOnInit()', r.messages);
          }
        });
      }
      console.log('ClientComponent::ngOnInit()', id);
    });
  }

  save() {
    console.log('ClientComponent::save()');
    this.service.add(
      this.form.get('name').value,
      this.form.get('description').value
    ).subscribe((r: ApiResult) => {
      if (r.status) {
        r.messages.forEach((m: Message) => {
          this.messages.push(m.text);
        });
        this.router.navigate([ 'admin', 'clients' ]);
      } else {
        console.error(r);
      }
    });
  }

}
