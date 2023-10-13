import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherTypeComponent } from './other-type.component';

describe('OtherTypeComponent', () => {
  let component: OtherTypeComponent;
  let fixture: ComponentFixture<OtherTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
