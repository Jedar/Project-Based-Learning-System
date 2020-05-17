import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerClassCreateComponent } from './manager-class-create.component';

describe('ManagerClassCreateComponent', () => {
  let component: ManagerClassCreateComponent;
  let fixture: ComponentFixture<ManagerClassCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerClassCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerClassCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
