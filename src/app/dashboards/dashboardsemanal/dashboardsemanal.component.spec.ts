import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardsemanalComponent } from './dashboardsemanal.component';

describe('DashboardsemanalComponent', () => {
  let component: DashboardsemanalComponent;
  let fixture: ComponentFixture<DashboardsemanalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardsemanalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardsemanalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
