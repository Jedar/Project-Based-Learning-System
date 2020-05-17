import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerTeacherCreateComponent } from './manager-teacher-create.component';

describe('ManagerTeacherCreateComponent', () => {
  let component: ManagerTeacherCreateComponent;
  let fixture: ComponentFixture<ManagerTeacherCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerTeacherCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerTeacherCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
