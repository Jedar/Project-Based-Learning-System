import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PjFileComponent } from './pj-file.component';

describe('PjFileComponent', () => {
  let component: PjFileComponent;
  let fixture: ComponentFixture<PjFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PjFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PjFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
