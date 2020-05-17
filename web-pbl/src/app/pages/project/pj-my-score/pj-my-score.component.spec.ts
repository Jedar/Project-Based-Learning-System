import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PjMyScoreComponent } from './pj-my-score.component';

describe('PjMyScoreComponent', () => {
  let component: PjMyScoreComponent;
  let fixture: ComponentFixture<PjMyScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PjMyScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PjMyScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
