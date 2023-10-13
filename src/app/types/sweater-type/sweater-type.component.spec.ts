import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SweaterTypeComponent } from './sweater-type.component';

describe('SweaterTypeComponent', () => {
  let component: SweaterTypeComponent;
  let fixture: ComponentFixture<SweaterTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SweaterTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SweaterTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
