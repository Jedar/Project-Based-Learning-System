import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherMainComponent } from './teacher-main.component';

describe('TeacherMainComponent', () => {
  let component: TeacherMainComponent;
  let fixture: ComponentFixture<TeacherMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
