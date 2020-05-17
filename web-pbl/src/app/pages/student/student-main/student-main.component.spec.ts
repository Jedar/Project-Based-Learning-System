import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMainComponent } from './student-main.component';

describe('StudentMainComponent', () => {
  let component: StudentMainComponent;
  let fixture: ComponentFixture<StudentMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
