import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosNew } from './pedidos.new';

describe('PedidosNew', () => {
  let component: PedidosNew;
  let fixture: ComponentFixture<PedidosNew>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidosNew]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidosNew);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
