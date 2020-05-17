import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PjAllTaskComponent } from './pj-all-task.component';

describe('PjAllTaskComponent', () => {
  let component: PjAllTaskComponent;
  let fixture: ComponentFixture<PjAllTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PjAllTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PjAllTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
