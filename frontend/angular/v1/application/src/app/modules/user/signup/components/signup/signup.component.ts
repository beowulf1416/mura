import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { FormControl, Validators, FormGroup, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { SignupService } from '../../services/signup.service';
import { ApiResult } from 'src/app/classes/api-result';
import { Router } from '@angular/router';


// export function PasswordValidator(): ValidatorFn {
//   return (control: AbstractControl): {[key: string]: boolean} | null => {
//     const password1 = control.get('pw1').value;
//     const password2 = control.get('pw2').value;

//     console.log('PasswordValidator', password1, password2);

//     return password1 === password2 ? null : { 'password': true };
//   };
// }

export const passwordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password1 = control.get('pw1');
  const password2 = control.get('pw2');

  return password1 && password2 && password1.value === password2.value ? null : { 'password': true };
};

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    passwords: new FormGroup(
      {
        pw1: new FormControl('', [
          Validators.required,
          Validators.minLength(6)
        ]),
        pw2: new FormControl('', [
          Validators.required
        ])
      },
      {
        validators: passwordValidator
      }
    )
  });

  constructor(
    private title: Title,
    private service: SignupService,
    private router: Router
  ) { }

  ngOnInit() {
    this.title.setTitle('Sign Up');
  }

  submit() {
    console.log('SignupComponent::submit()');
    this.service.register(
      this.form.get('email').value,
      this.form.get('passwords').get('pw1').value
    ).subscribe((r: ApiResult) => {
      if (r.status) {
        this.router.navigate(['user', 'signup', 'success']);
      } else {
        console.error(r);
      }
    });
  }
}
