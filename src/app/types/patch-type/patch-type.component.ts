import {Component, Input, OnInit} from '@angular/core';
import { FormControl,Validators } from '@angular/forms';
import { CalculatorService } from 'src/app/calc-service/CalculatorService';
import {OrderDto} from "../../models/order-dto";

@Component({
  selector: 'patch-type-page',
  templateUrl: './patch-type.component.html',
  styleUrls: ['./patch-type.component.scss','../../../styles.scss']
})
export class PatchTypeComponent implements OnInit{
  @Input() isInternal!: boolean;
  constructor(private calculatorService: CalculatorService) {}

  basePrice: number = 1;

  patchQuantity = new FormControl(0,Validators.compose([ Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(1)]));
  patchDiameter= new FormControl(0, Validators.compose([ Validators.required, Validators.pattern("^[0-9]{1,2}([.][0-9]{1,2})?$"), Validators.min(1)]));
  patchStitches= new FormControl(0, Validators.compose([Validators.pattern("^[0-9]*$"), Validators.min(0)]));
  patchStitchesSulky= new FormControl(0, Validators.compose([Validators.pattern("^[0-9]*$"), Validators.min(0)]));
  patchStitchesGold= new FormControl(0, Validators.compose([Validators.pattern("^[0-9]*$"), Validators.min(0)]));
  patchStitchesTex = new FormControl(0, Validators.compose([Validators.pattern("^[0-9]*$"), Validators.min(0)]));
  dueDate = new FormControl(null);

  price: number = 0;
  pricePerPatch: number = 0;


  async calculate() {
    if (this.patchQuantity.valid && this.patchDiameter.valid && this.patchStitches.valid && this.patchStitchesSulky.valid && this.patchStitchesGold.valid && this.patchStitchesTex.valid){
      let order: OrderDto = {
        isInternalOrder: this.isInternal,
        patchQuantity: this.patchQuantity.value!,
        patchDiameter: this.patchDiameter.value!,
        patchStitches: this.patchStitches.value!,
        patchStitchesSulky: this.patchStitchesSulky.value!,
        patchStitchesGolden: this.patchStitchesGold.value!,
        patchStitchesTex: this.patchStitchesTex.value!,
        dueDateInDays: (this.dueDate.value != null || this.dueDate.value ? this.dueDate.value : 999)
      }
      this.price = await this.calculatorService.calculatePatchPrice(order);
      if (this.patchQuantity.value != null) {
        this.pricePerPatch = this.price / this.patchQuantity.value;
      } else {
        this.pricePerPatch = this.price;
      }
      this.price = this.price + await this.basePrice;
    }
  }

  async ngOnInit(): Promise<void> {
    this.basePrice = await this.calculatorService.getBasePrice() * (await this.isInternal ? 1 : await this.calculatorService.getExternalMultiplier());
  }
  async setHint(internal: boolean){
    this.basePrice = await this.calculatorService.getBasePrice() * (internal ? 1 : 2);
  }

}
