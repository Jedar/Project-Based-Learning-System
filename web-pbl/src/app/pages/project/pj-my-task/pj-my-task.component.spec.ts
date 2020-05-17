import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PjMyTaskComponent } from './pj-my-task.component';

describe('PjMyTaskComponent', () => {
  let component: PjMyTaskComponent;
  let fixture: ComponentFixture<PjMyTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PjMyTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PjMyTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
