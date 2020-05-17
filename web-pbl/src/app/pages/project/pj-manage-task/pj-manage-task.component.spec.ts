import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PjManageTaskComponent } from './pj-manage-task.component';

describe('PjManageTaskComponent', () => {
  let component: PjManageTaskComponent;
  let fixture: ComponentFixture<PjManageTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PjManageTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PjManageTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
