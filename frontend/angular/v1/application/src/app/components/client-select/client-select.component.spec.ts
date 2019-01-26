import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSelectComponent } from './client-select.component';

describe('ClientSelectComponent', () => {
  let component: ClientSelectComponent;
  let fixture: ComponentFixture<ClientSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
