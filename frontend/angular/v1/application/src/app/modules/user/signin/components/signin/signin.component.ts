import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { SigninService } from '../../services/signin.service';
import { ApiResult } from 'src/app/classes/api-result';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  // clients = [];

  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    // client: new FormControl('', [
    //   Validators.required
    // ])
  });

  constructor(
    private title: Title,
    private service: SigninService,
    private router: Router
  ) { }

  ngOnInit() {
    this.title.setTitle('Sign In');
    // this.init_clients();
  }

  // init_clients() {
  //   this.service.get_clients_list().subscribe((r: ApiResult) => {
  //     if (r.status) {
  //       this.clients = r.data.clients;
  //     } else {
  //       r.messages.forEach(e => {
  //         console.error(e);
  //       });
  //     }
  //   });
  // }

  submit() {
    console.log('SignInComponent::submit()');
    this.service.signin(
      this.form.get('email').value,
      this.form.get('password').value
    ).subscribe((r: ApiResult) => {
      if (r.status) {
        console.log('SignInComponent::submit()', r);
        if (r.data.authenticated) {
          this.router.navigate(['dashboard']);
          // this.router.navigate(['select', 'client']);
        } else {
          console.log('SignInComponent::submit()', 'authentication failed');
        }
      } else {
        console.error('SignInComponent::submit()', r);
      }
    });
  }

}
