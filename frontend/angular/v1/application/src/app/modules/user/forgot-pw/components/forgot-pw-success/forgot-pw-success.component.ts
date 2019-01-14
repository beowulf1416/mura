import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { ForgotPwService } from '../../services/forgot-pw.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiResult } from 'src/app/classes/api-result';

@Component({
  selector: 'app-forgot-pw-success',
  templateUrl: './forgot-pw-success.component.html',
  styleUrls: ['./forgot-pw-success.component.css']
})
export class ForgotPwSuccessComponent implements OnInit {

  constructor(
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Password Reset');
  }

}
