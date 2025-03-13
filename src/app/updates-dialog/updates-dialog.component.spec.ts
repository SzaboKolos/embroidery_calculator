import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatesDialogComponent } from './updates-dialog.component';

describe('UpdatesDialogComponent', () => {
  let component: UpdatesDialogComponent;
  let fixture: ComponentFixture<UpdatesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatesDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
