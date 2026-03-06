import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesForm } from './times-form';

describe('TimesForm', () => {
  let component: TimesForm;
  let fixture: ComponentFixture<TimesForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimesForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimesForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
