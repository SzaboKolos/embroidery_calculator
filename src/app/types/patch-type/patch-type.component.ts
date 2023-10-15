import { Component } from '@angular/core';
import { FormControl,Validators } from '@angular/forms';
import { CalculatorService } from 'src/app/calc-service/CalculatorService';

@Component({
  selector: 'patch-type-page',
  templateUrl: './patch-type.component.html',
  styleUrls: ['./patch-type.component.scss','../../../styles.scss']
})
export class PatchTypeComponent {
  constructor(private calculatorService: CalculatorService) {}
  

  patchQuantity = new FormControl(0,Validators.compose([ Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(1)]));
  patchDiameter= new FormControl(0, Validators.compose([ Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(1)]));
  patchStitches= new FormControl(0, Validators.compose([Validators.pattern("^[0-9]*$"), Validators.min(0)]));
  patchStitchesSulky= new FormControl(0, Validators.compose([Validators.pattern("^[0-9]*$"), Validators.min(0)]));
  patchStitchesGolden= new FormControl(0, Validators.compose([Validators.pattern("^[0-9]*$"), Validators.min(0)]));
  patchStitchesTex = new FormControl(0, Validators.compose([Validators.pattern("^[0-9]*$"), Validators.min(0)]));
  dueDate = new FormControl(null);

  price: number = 0;
  pricePerPatch: number = 0;


  async calculate() {    
    if (this.patchQuantity.valid && this.patchDiameter.valid && this.patchStitches.valid && this.patchStitchesSulky.valid && this.patchStitchesGolden.valid && this.patchStitchesTex.valid){
      this.price = await this.calculatorService.calculatePatchPrice(true, this.patchQuantity.value!, this.patchDiameter.value!, this.patchStitches.value!, this.patchStitchesSulky.value!, this.patchStitchesGolden.value!,this.patchStitchesTex.value!, (this.dueDate.value != null || this.dueDate.value ? this.dueDate.value : 999))     
      if (this.patchQuantity.value != null) {
        this.pricePerPatch = this.price / this.patchQuantity.value;
      } else {
        this.pricePerPatch = this.price;
      }
    }
  }

}
