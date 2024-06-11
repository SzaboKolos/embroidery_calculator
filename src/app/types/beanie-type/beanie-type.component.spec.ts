import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeanieTypeComponent } from './beanie-type.component';

describe('SweaterTypeComponent', () => {
  let component: BeanieTypeComponent;
  let fixture: ComponentFixture<BeanieTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeanieTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeanieTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
