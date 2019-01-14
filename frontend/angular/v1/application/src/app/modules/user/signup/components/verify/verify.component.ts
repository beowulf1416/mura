import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SignupService } from '../../services/signup.service';
import { ApiResult } from 'src/app/classes/api-result';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  verified = false;

  constructor(
    private title: Title,
    private route: ActivatedRoute,
    private service: SignupService
  ) { }

  ngOnInit() {
    this.title.setTitle('Verify Sign Up');
    this.route.paramMap.subscribe((p: ParamMap) => {
      const token = p.get('token');

      this.service.verify(token).subscribe((r: ApiResult) => {
        if (r.status) {
          this.verified = true;
        } else {
          console.error(r);
        }
      });
    });
  }

}
