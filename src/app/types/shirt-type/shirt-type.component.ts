import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormControl,Validators } from '@angular/forms';
import { CalculatorService } from 'src/app/services/calculator-service';
import {OrderDto} from "../../models/order-dto";
import {BasketItem} from "../../models/basket-item";

@Component({
  selector: 'shirt-type-page',
  templateUrl: './shirt-type.component.html',
  styleUrls: ['./shirt-type.component.scss','../../../styles.scss']
})
export class ShirtTypeComponent implements OnInit{
  @Input() isInternal!: boolean;
  @Output() addedToBasket: EventEmitter<BasketItem> = new EventEmitter();

  constructor(private calculatorService: CalculatorService) {}

  basePrice: number = 1;
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
      let order = {
        isInternalOrder: this.isInternal,
        quantity: this.embroideryQuantity.value!,
        stitches: this.stitches.value!,
        stitchesSulky: this.stitchesSulky.value!,
        stitchesGolden: this.stitchesGold.value!,
        stitchesTex: this.stitchesTex.value!,
        dueDateInDays: (this.dueDate.value != null || this.dueDate.value ? this.dueDate.value : 999)
      } as OrderDto;
      this.price = await this.calculatorService.calculateShirtPrice(order);
      if (this.embroideryQuantity.value != null) {
        this.pricePerPatch = this.price / this.embroideryQuantity.value;
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
        type: 2,
        quantity: this.embroideryQuantity.value!,
        pricePerPatch: this.pricePerPatch,
        sumPrice: this.price,
        internal: this.isInternal
      };
      this.addedToBasket.emit(dto);
      this.name.setValue(null);
    }
  }
}
