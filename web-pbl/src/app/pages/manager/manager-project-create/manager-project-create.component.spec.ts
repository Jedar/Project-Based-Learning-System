import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerProjectCreateComponent } from './manager-project-create.component';

describe('ManagerProjectCreateComponent', () => {
  let component: ManagerProjectCreateComponent;
  let fixture: ComponentFixture<ManagerProjectCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerProjectCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerProjectCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
