import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerClassChartComponent } from './manager-class-chart.component';

describe('ManagerClassChartComponent', () => {
  let component: ManagerClassChartComponent;
  let fixture: ComponentFixture<ManagerClassChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerClassChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerClassChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
