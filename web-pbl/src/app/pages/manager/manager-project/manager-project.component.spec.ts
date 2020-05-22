import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerProjectComponent } from './manager-project.component';

describe('ManagerProjectComponent', () => {
  let component: ManagerProjectComponent;
  let fixture: ComponentFixture<ManagerProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
