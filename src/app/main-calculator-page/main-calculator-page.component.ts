import {Component, ViewChild} from '@angular/core';
import { CalculatorService } from '../services/calculator-service';
import {PatchTypeComponent} from "../types/patch-type/patch-type.component";
import {BeanieTypeComponent} from "../types/beanie-type/beanie-type.component";
import {ShirtTypeComponent} from "../types/shirt-type/shirt-type.component";
import {BasketService} from "../services/basket-service";
import {BasketComponent} from "../basket/basket.component";
import {BasketItem} from "../models/basket-item";

@Component({
  selector: 'app-main-calculator-page',
  templateUrl: './main-calculator-page.component.html',
  styleUrls: ['./main-calculator-page.component.scss'],
})
export class MainCalculatorPageComponent {
  isBetaVersion = true;
  version = '3.2.1'
  settingsOpenState = false;
  category = 0;

  @ViewChild(PatchTypeComponent) patchTypeComponent!: PatchTypeComponent;
  @ViewChild(ShirtTypeComponent) shirtTypeComponent!: ShirtTypeComponent;
  @ViewChild(BeanieTypeComponent) sweaterTypeComponent!: BeanieTypeComponent;
  @ViewChild(BasketComponent) basket!: BasketComponent;

  constructor(private calculatorService: CalculatorService,
              private basketService: BasketService){
    if (localStorage.getItem('pricesDTO') != null){
      CalculatorService.setPricesByDTO(JSON.parse(localStorage.getItem('pricesDTO')!));
    } else {
      // setting initial values
      CalculatorService.setPricesByDTO(
        {
          price: 200,
          broughtPrice: 500,

          stitchPrice: 1,
          stitchSulkyPrice: 1,
          stitchGoldPrice: 8,
          stitchTexPrice: 8,

          multiplier: 1,
          externalMultiplier: 1.35
        }
      );
    }
  }
  onValChange(val: number) {
    if (this.category != val) {
      this.category = val;
      CalculatorService.setCategory(this.category);
    }
  }
  addToBasket(event: BasketItem) {
    this.basket.addToBasket(event);
  }
  openBasketDialog() {

  }
}
