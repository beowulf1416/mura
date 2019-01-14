import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { UserService } from '../../../../../services/user.service';
import { ApiResult } from '../../../../../classes/api-result';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css']
})
export class SignoutComponent implements OnInit {

  signed_out = false;

  constructor(
    private title: Title,
    private service: UserService
  ) { }

  ngOnInit() {
    this.title.setTitle('Sign Out');
    this.service.signout().subscribe((r: ApiResult) => {
      if (r.status) {
        this.signed_out = true;
      } else {
        console.error('SignoutComponent::ngOnInit()', r.messages);
      }
    });
  }

}
