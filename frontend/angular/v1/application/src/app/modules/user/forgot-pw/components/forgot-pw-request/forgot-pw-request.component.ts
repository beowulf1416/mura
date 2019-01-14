import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { ForgotPwService } from '../../services/forgot-pw.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiResult } from '../../../../../classes/api-result';

@Component({
  selector: 'app-forgot-pw-request',
  templateUrl: './forgot-pw-request.component.html',
  styleUrls: ['./forgot-pw-request.component.css']
})
export class ForgotPwRequestComponent implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ])
  });

  constructor(
    private title: Title,
    private router: Router,
    private service: ForgotPwService
  ) { }

  ngOnInit() {
    this.title.setTitle('Request Password Reset');
  }

  submit() {
    console.log('ForgotPwRequestComponent::submit()');
    this.service.request(this.form.get('email').value).subscribe((r: ApiResult) => {
      if (r.status) {
        this.router.navigate(['user', 'forgot-pw', 'request', 'success']);
      } else {
        console.log('ForgotPwRequestComponent::submit()', r);
      }
    });
  }
}
