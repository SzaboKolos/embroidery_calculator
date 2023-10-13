import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCalculatorPageComponent } from './main-calculator-page.component';

describe('MainCalculatorPageComponent', () => {
  let component: MainCalculatorPageComponent;
  let fixture: ComponentFixture<MainCalculatorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainCalculatorPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainCalculatorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
