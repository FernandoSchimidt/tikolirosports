import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaisesList } from './paises-list';

describe('PaisesList', () => {
  let component: PaisesList;
  let fixture: ComponentFixture<PaisesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaisesList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaisesList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
