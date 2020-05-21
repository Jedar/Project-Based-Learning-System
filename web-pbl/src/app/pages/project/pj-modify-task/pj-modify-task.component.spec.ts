import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PjModifyTaskComponent } from './pj-modify-task.component';

describe('PjModifyTaskComponent', () => {
  let component: PjModifyTaskComponent;
  let fixture: ComponentFixture<PjModifyTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PjModifyTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PjModifyTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
