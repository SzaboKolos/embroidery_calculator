import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseSwatchComponent } from './house-swatch.component';

describe('HouseSwatchComponent', () => {
  let component: HouseSwatchComponent;
  let fixture: ComponentFixture<HouseSwatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseSwatchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseSwatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
