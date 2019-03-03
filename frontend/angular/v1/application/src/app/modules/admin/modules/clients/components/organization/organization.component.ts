import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { ClientsService } from '../../services/clients.service';
import { ApiResult } from 'src/app/classes/api-result';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    description: new FormControl(''),
    parent: new FormControl('')
  });

  constructor(
    private title: Title,
    private router: Router,
    private route: ActivatedRoute,
    private client_service: ClientsService,
    private user_service: UserService
  ) { }

  ngOnInit() {
    this.title.setTitle('Organization');
    this.route.paramMap.subscribe((p: ParamMap) => {
      const org_id = p.get('id');
      if (org_id != null) {
        console.log('OrganizationComponent::ngOnInit()');
      }
    });
  }

  save() {
    console.log('OrganizationComponent::save()');
    this.user_service.client$.subscribe(c => {
      const client_id = c.id;
      this.client_service.organization_add(
        client_id,
        this.form.get('name').value,
        this.form.get('description').value,
        this.form.get('parent').value
      ).subscribe((r: ApiResult) => {
        if (r.status) {
          this.router.navigate([ 'admin', 'clients', 'organizations' ]);
        } else {
          console.error(r.messages);
        }
      });
    });
  }
}
