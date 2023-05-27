import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardmensalComponent } from './dashboardmensal.component';

describe('DashboardmensalComponent', () => {
  let component: DashboardmensalComponent;
  let fixture: ComponentFixture<DashboardmensalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardmensalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardmensalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
