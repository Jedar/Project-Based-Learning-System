import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerSystemComponent } from './manager-system.component';

describe('ManagerSystemComponent', () => {
  let component: ManagerSystemComponent;
  let fixture: ComponentFixture<ManagerSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
