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
  @Input() category!: number;
  @Output() addedToBasket: EventEmitter<BasketItem> = new EventEmitter();
  constructor(private calculatorService: CalculatorService,
              private basketService: BasketService) {}

  basePrice: number = 1;
  basePriceHint: number = 0;

  patchQuantity = new FormControl(0,Validators.compose([ Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(1) ]));
  patchStitches= new FormControl(0, Validators.compose([ Validators.pattern("^[0-9]*$"), Validators.min(0) ]));
  patchStitchesSulky= new FormControl(0, Validators.compose([ Validators.pattern("^[0-9]*$"), Validators.min(0) ]));
  patchStitchesGold= new FormControl(0, Validators.compose([ Validators.pattern("^[0-9]*$"), Validators.min(0) ]));
  patchStitchesTex = new FormControl(0, Validators.compose([ Validators.pattern("^[0-9]*$"), Validators.min(0) ]));
  enableIron = new FormControl<boolean>(false);

  name = new FormControl(null);
  dueDate = new FormControl(null);

  price: number = 0;
  pricePerPatch: number = 0;


  async calculate() {
    if (this.patchQuantity.valid && this.patchStitches.valid && this.patchStitchesSulky.valid && this.patchStitchesGold.valid && this.patchStitchesTex.valid){
      let order: OrderDto = {
        category: this.category,
        quantity: +this.patchQuantity.value!,
        stitches: +this.patchStitches.value!,
        stitchesSulky: +this.patchStitchesSulky.value!,
        stitchesGolden: +this.patchStitchesGold.value!,
        stitchesTex: +this.patchStitchesTex.value!,
        dueDateInDays: this.dueDate.value
      }
      this.price = await CalculatorService.round(await CalculatorService.calculatePatchPrice(order));
      if (this.patchQuantity.value != null) {
        this.pricePerPatch = await CalculatorService.roundAccurate(this.price / this.patchQuantity.value);
      } else {
        this.pricePerPatch = this.price;
      }
      if (this.patchQuantity.value! >= 100){
        this.price = this.price + 3000;
      } else
      if (this.patchQuantity.value! >= 10){
        this.price = this.price + 300;
      }
    }
    this.setHint();
  }

  async ngOnInit(): Promise<void> {
    this.basePrice = await CalculatorService.getBasePrice();
  }
  async setHint(){
    if (this.price > 0 && this.patchQuantity.value! >= 100){
      this.basePriceHint = 3000;
      return;
    }
    if (this.price > 0 && this.patchQuantity.value! >= 10){
      this.basePriceHint = 300;
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
        category: this.category
      };
      this.addedToBasket.emit(dto);
      this.name.setValue(null);
    }
  }
}
