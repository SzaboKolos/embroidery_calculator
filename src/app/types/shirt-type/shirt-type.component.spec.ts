import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShirtTypeComponent } from './shirt-type.component';

describe('ShirtTypeComponent', () => {
  let component: ShirtTypeComponent;
  let fixture: ComponentFixture<ShirtTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShirtTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShirtTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
