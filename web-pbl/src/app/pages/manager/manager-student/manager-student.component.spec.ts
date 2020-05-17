import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerStudentComponent } from './manager-student.component';

describe('ManagerStudentComponent', () => {
  let component: ManagerStudentComponent;
  let fixture: ComponentFixture<ManagerStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
