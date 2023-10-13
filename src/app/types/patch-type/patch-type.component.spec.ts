import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatchTypeComponent } from './patch-type.component';

describe('PatchTypeComponent', () => {
  let component: PatchTypeComponent;
  let fixture: ComponentFixture<PatchTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatchTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatchTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
