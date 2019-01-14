import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { ForgotPwService } from '../../services/forgot-pw.service';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { ApiResult } from 'src/app/classes/api-result';

export const passwordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password1 = control.get('pw1');
  const password2 = control.get('pw2');

  return password1 && password2 && password1.value === password2.value ? null : { 'password': true };
};


@Component({
  selector: 'app-forgot-pw',
  templateUrl: './forgot-pw.component.html',
  styleUrls: ['./forgot-pw.component.css']
})
export class ForgotPwComponent implements OnInit {

  form = new FormGroup({
    pw1: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    pw2: new FormControl('', [
      Validators.required
    ])
  }, {
    validators: passwordValidator
  });

  email = '';
  token = '';

  constructor(
    private title: Title,
    private route: ActivatedRoute,
    private router: Router,
    private service: ForgotPwService
  ) { }

  ngOnInit() {
    this.title.setTitle('Reset Password');
    this.route.paramMap.subscribe((p: ParamMap) => {
      this.token = p.get('token');

      this.service.validate_token(this.token).subscribe((r: ApiResult) => {
        if (r.status) {
          this.email = r.data.email;
        } else {
          console.error('ForgotPwComponent::ngOnInit()', r);
        }
      });
    });
  }

  submit() {
    console.log('ForgotPwComponent::submit()');
    this.service.reset(this.token, this.form.get('pw1').value).subscribe((r: ApiResult) => {
      if (r.status) {
        this.router.navigate(['user/forgot-pw/success']);
      } else {
        console.error(r);
      }
    });
  }

}
