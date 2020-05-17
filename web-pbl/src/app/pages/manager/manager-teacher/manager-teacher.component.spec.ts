import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerTeacherComponent } from './manager-teacher.component';

describe('ManagerTeacherComponent', () => {
  let component: ManagerTeacherComponent;
  let fixture: ComponentFixture<ManagerTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
