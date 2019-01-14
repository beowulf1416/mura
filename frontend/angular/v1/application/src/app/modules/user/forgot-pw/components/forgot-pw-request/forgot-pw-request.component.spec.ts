import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPwRequestComponent } from './forgot-pw-request.component';

describe('ForgotPwRequestComponent', () => {
  let component: ForgotPwRequestComponent;
  let fixture: ComponentFixture<ForgotPwRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPwRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPwRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
