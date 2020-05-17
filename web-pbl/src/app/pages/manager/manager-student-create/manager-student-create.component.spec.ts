import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerStudentCreateComponent } from './manager-student-create.component';

describe('ManagerStudentCreateComponent', () => {
  let component: ManagerStudentCreateComponent;
  let fixture: ComponentFixture<ManagerStudentCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerStudentCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerStudentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
