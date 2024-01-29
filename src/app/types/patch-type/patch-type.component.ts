import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormControl,Validators } from '@angular/forms';
import { CalculatorService } from 'src/app/services/calculator-service';
import { OrderDto } from "../../models/order-dto";
import {BasketService} from "../../services/basket-service";
import {BasketItem} from "../../models/basket-item";

@Component({
  selector: 'patch-type-page',
  templateUrl: './patch-type.component.html',
  styleUrls: ['./patch-type.component.scss','../../../styles.scss']
})
export class PatchTypeComponent implements OnInit{
  @Input() isInternal!: boolean;
  @Output() addedToBasket: EventEmitter<BasketItem> = new EventEmitter();
  constructor(private calculatorService: CalculatorService,
              private basketService: BasketService) {}

  basePrice: number = 1;
  basePriceHint: number = 0;

  patchQuantity = new FormControl(0,Validators.compose([ Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(1) ]));
  patchDiameter= new FormControl(0, Validators.compose([ Validators.required, Validators.pattern("^[\.0-9]*$"), Validators.min(1) ]));
  patchStitches= new FormControl(0, Validators.compose([ Validators.pattern("^[0-9]*$"), Validators.min(0) ]));
  patchStitchesSulky= new FormControl(0, Validators.compose([ Validators.pattern("^[0-9]*$"), Validators.min(0) ]));
  patchStitchesGold= new FormControl(0, Validators.compose([ Validators.pattern("^[0-9]*$"), Validators.min(0) ]));
  patchStitchesTex = new FormControl(0, Validators.compose([ Validators.pattern("^[0-9]*$"), Validators.min(0) ]));

  name = new FormControl(null);
  dueDate = new FormControl(null);

  price: number = 0;
  pricePerPatch: number = 0;


  async calculate() {
    if (this.patchQuantity.valid && this.patchDiameter.valid && this.patchStitches.valid && this.patchStitchesSulky.valid && this.patchStitchesGold.valid && this.patchStitchesTex.valid){
      let order: OrderDto = {
        isInternalOrder: this.isInternal,
        quantity: this.patchQuantity.value!,
        diameter: this.patchDiameter.value!,
        stitches: this.patchStitches.value!,
        stitchesSulky: this.patchStitchesSulky.value!,
        stitchesGolden: this.patchStitchesGold.value!,
        stitchesTex: this.patchStitchesTex.value!,
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
    this.setHint();
  }

  async ngOnInit(): Promise<void> {
    this.basePrice = await this.calculatorService.getBasePrice() * (await this.isInternal ? 1 : await this.calculatorService.getExternalMultiplier());
  }
  async setHint(){
    this.basePrice = await this.calculatorService.getBasePrice() * (this.isInternal ? 1 : 2);
    if (this.price > 0){
      this.basePriceHint = this.basePrice;
      return;
    }
    this.basePriceHint = 0;
  }
  async addToBasket() {
    if (this.name.value != null) {
      await this.calculate();
      const dto: BasketItem = {
        name: this.name.value!,
        type: 1,
        quantity: this.patchQuantity.value!,
        pricePerPatch: this.pricePerPatch,
        sumPrice: this.price,
        internal: this.isInternal
      };
      this.addedToBasket.emit(dto);
      this.name.setValue(null);
    }
  }
}
