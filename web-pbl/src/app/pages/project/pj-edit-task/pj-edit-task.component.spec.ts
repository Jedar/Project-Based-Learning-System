import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PjEditTaskComponent } from './pj-edit-task.component';

describe('PjEditTaskComponent', () => {
  let component: PjEditTaskComponent;
  let fixture: ComponentFixture<PjEditTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PjEditTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PjEditTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
