import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PjTeacherMainComponent } from './pj-teacher-main.component';

describe('PjTeacherMainComponent', () => {
  let component: PjTeacherMainComponent;
  let fixture: ComponentFixture<PjTeacherMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PjTeacherMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PjTeacherMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
