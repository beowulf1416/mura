import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientJoinComponent } from './client-join.component';

describe('ClientJoinComponent', () => {
  let component: ClientJoinComponent;
  let fixture: ComponentFixture<ClientJoinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientJoinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
