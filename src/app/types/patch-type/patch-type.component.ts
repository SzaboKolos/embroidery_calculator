import { Component } from '@angular/core';
import { FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'patch-type-page',
  templateUrl: './patch-type.component.html',
  styleUrls: ['./patch-type.component.scss','../../../styles.scss']
})
export class PatchTypeComponent {
  patchQuantity = new FormControl('', [
    Validators.required,
    Validators.pattern("^[0-9]*$"),
  ])
  patchDiameter= new FormControl('', [
    Validators.required,
    Validators.pattern("^[0-9]*$"),
  ])
  patchStitches= new FormControl('', [
    Validators.pattern("^[0-9]*$"),
  ])
  patchFancyStitches = new FormControl('', [
    Validators.pattern("^[0-9]*$"),
  ])

  constructor(){}
}
