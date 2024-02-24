import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormControl,Validators } from '@angular/forms';
import { CalculatorService } from 'src/app/services/calculator-service';
import {OrderDto} from "../../models/order-dto";
import {BasketItem} from "../../models/basket-item";

@Component({
  selector: 'beanie-type-page',
  templateUrl: './beanie-type.component.html',
  styleUrls: ['./beanie-type.component.scss','../../../styles.scss']
})
export class BeanieTypeComponent implements OnInit{
  @Input() category!: number;
  @Output() addedToBasket: EventEmitter<BasketItem> = new EventEmitter();

  constructor(private calculatorService: CalculatorService) {}

  baseBroughtPrice: number = 1;
  basePriceHint: number = 0;

  embroideryQuantity = new FormControl(0,Validators.compose([ Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(1)]));
  stitches= new FormControl(0, Validators.compose([Validators.pattern("^[0-9]*$"), Validators.min(0)]));
  stitchesSulky= new FormControl(0, Validators.compose([Validators.pattern("^[0-9]*$"), Validators.min(0)]));
  stitchesGold= new FormControl(0, Validators.compose([Validators.pattern("^[0-9]*$"), Validators.min(0)]));
  stitchesTex = new FormControl(0, Validators.compose([Validators.pattern("^[0-9]*$"), Validators.min(0)]));

  name = new FormControl(null);
  dueDate = new FormControl(null);

  price: number = 0;
  pricePerPatch: number = 0;


  async calculate() {
    if (this.embroideryQuantity.valid && this.stitches.valid && this.stitchesSulky.valid && this.stitchesGold.valid && this.stitchesTex.valid){
      let order: OrderDto = {
        category: this.category,
        quantity: +this.embroideryQuantity.value!,
        stitches: +this.stitches.value!,
        stitchesSulky: +this.stitchesSulky.value!,
        stitchesGolden: +this.stitchesGold.value!,
        stitchesTex: +this.stitchesTex.value!,
        dueDateInDays: (this.dueDate.value != null || this.dueDate.value ? this.dueDate.value : 999)
      } as OrderDto;
      this.price = await CalculatorService.round(await CalculatorService.calculateBeaniePrice(order));
      if (this.embroideryQuantity.value != null) {
        this.pricePerPatch = await CalculatorService.roundAccurate(this.price / this.embroideryQuantity.value);
      } else {
        this.pricePerPatch = this.price;
      }
      if (this.embroideryQuantity.value! >= 100){
        this.price = this.price + 3000;
      } else
      if (this.embroideryQuantity.value! >= 10){
        this.price = this.price + 300;
      }
    }
    this.setHint();
  }

  async ngOnInit(): Promise<void> {
    this.baseBroughtPrice = await CalculatorService.getBasePrice()
  }
  async setHint(){
    if (this.price > 0 && this.embroideryQuantity.value! >= 100){
      this.basePriceHint = 3000;
      return;
    }
    if (this.price > 0 && this.embroideryQuantity.value! >= 10){
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
        type: 2,
        quantity: this.embroideryQuantity.value!,
        pricePerPatch: this.pricePerPatch,
        sumPrice: this.price,
        category: this.category
      };
      this.addedToBasket.emit(dto);
      this.name.setValue(null);
    }
  }
}
