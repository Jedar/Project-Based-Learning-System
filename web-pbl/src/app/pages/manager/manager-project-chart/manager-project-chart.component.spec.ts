import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerProjectChartComponent } from './manager-project-chart.component';

describe('ManagerProjectChartComponent', () => {
  let component: ManagerProjectChartComponent;
  let fixture: ComponentFixture<ManagerProjectChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerProjectChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerProjectChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
