import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardanualComponent } from './dashboardanual.component';

describe('DashboardanualComponent', () => {
  let component: DashboardanualComponent;
  let fixture: ComponentFixture<DashboardanualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardanualComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardanualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
