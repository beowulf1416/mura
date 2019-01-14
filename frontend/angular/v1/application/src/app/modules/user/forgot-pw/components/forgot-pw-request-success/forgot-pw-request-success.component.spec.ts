import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPwRequestSuccessComponent } from './forgot-pw-request-success.component';

describe('ForgotPwRequestSuccessComponent', () => {
  let component: ForgotPwRequestSuccessComponent;
  let fixture: ComponentFixture<ForgotPwRequestSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPwRequestSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPwRequestSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
