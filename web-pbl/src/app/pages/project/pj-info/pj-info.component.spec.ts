import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PjInfoComponent} from './pj-info.component';

describe('PjInfoComponent', () => {
  let component: PjInfoComponent;
  let fixture: ComponentFixture<PjInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PjInfoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PjInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
