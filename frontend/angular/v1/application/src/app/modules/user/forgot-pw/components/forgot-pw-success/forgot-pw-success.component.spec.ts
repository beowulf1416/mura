import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPwSuccessComponent } from './forgot-pw-success.component';

describe('ForgotPwSuccessComponent', () => {
  let component: ForgotPwSuccessComponent;
  let fixture: ComponentFixture<ForgotPwSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPwSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPwSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
