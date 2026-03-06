import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesNew } from './clientes-new';

describe('ClientesNew', () => {
  let component: ClientesNew;
  let fixture: ComponentFixture<ClientesNew>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesNew]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientesNew);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
