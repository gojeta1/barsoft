import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelausuariosComponent } from './tabelausuarios.component';

describe('TabelausuariosComponent', () => {
  let component: TabelausuariosComponent;
  let fixture: ComponentFixture<TabelausuariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabelausuariosComponent]
    });
    fixture = TestBed.createComponent(TabelausuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
