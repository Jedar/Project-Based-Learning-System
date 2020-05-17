import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerClassComponent } from './manager-class.component';

describe('ManagerClassComponent', () => {
  let component: ManagerClassComponent;
  let fixture: ComponentFixture<ManagerClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
