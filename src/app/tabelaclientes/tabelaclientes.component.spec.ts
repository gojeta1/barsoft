import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaclientesComponent } from './tabelaclientes.component';

describe('TabelaclientesComponent', () => {
  let component: TabelaclientesComponent;
  let fixture: ComponentFixture<TabelaclientesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabelaclientesComponent]
    });
    fixture = TestBed.createComponent(TabelaclientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
