import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmamodalComponent } from './confirmamodal.component';

describe('ConfirmamodalComponent', () => {
  let component: ConfirmamodalComponent;
  let fixture: ComponentFixture<ConfirmamodalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmamodalComponent]
    });
    fixture = TestBed.createComponent(ConfirmamodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
