import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseJoinComponent } from './course-join.component';

describe('CourseJoinComponent', () => {
  let component: CourseJoinComponent;
  let fixture: ComponentFixture<CourseJoinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseJoinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
