import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PjDiscussComponent} from './pj-discuss.component';

describe('PjDiscussComponent', () => {
  let component: PjDiscussComponent;
  let fixture: ComponentFixture<PjDiscussComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PjDiscussComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PjDiscussComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
