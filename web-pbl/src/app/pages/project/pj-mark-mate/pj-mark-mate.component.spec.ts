import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PjMarkMateComponent} from './pj-mark-mate.component';

describe('PjMarkMateComponent', () => {
  let component: PjMarkMateComponent;
  let fixture: ComponentFixture<PjMarkMateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PjMarkMateComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PjMarkMateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
