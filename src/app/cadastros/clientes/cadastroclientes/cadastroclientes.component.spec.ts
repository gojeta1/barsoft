import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroclientesComponent } from './cadastroclientes.component';

describe('CadastroclientesComponent', () => {
  let component: CadastroclientesComponent;
  let fixture: ComponentFixture<CadastroclientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroclientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroclientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
