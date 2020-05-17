import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PjStudentMainComponent } from './pj-student-main.component';

describe('PjStudentMainComponent', () => {
  let component: PjStudentMainComponent;
  let fixture: ComponentFixture<PjStudentMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PjStudentMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PjStudentMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
