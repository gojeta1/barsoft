import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardgeralComponent } from './dashboardgeral.component';

describe('DashboardgeralComponent', () => {
  let component: DashboardgeralComponent;
  let fixture: ComponentFixture<DashboardgeralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardgeralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardgeralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
