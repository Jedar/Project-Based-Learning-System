import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PjMarkScoreComponent} from './pj-mark-score.component';

describe('PjMarkScoreComponent', () => {
  let component: PjMarkScoreComponent;
  let fixture: ComponentFixture<PjMarkScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PjMarkScoreComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PjMarkScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
