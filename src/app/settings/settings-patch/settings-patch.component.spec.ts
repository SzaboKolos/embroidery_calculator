import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsPatchComponent } from './settings-patch.component';

describe('SettingsPatchComponent', () => {
  let component: SettingsPatchComponent;
  let fixture: ComponentFixture<SettingsPatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsPatchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsPatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
