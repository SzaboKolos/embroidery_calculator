import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { CalculatorService } from '../services/calculator-service';
import { SettingsPatchComponent } from '../settings/settings-patch/settings-patch.component';
import { PricesDTO } from '../models/prices-dto';
import {PatchTypeComponent} from "../types/patch-type/patch-type.component";
import {SweaterTypeComponent} from "../types/sweater-type/sweater-type.component";
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
  version = '3.1.4'
  settingsOpenState = false;
  isInternalOrder = true;

  @ViewChild(PatchTypeComponent) patchTypeComponent!: PatchTypeComponent;
  @ViewChild(ShirtTypeComponent) shirtTypeComponent!: ShirtTypeComponent;
  @ViewChild(SweaterTypeComponent) sweaterTypeComponent!: SweaterTypeComponent;
  @ViewChild(BasketComponent) basket!: BasketComponent;

  constructor(private calculatorService: CalculatorService,
              private basketService: BasketService){
    if (localStorage.getItem('pricesDTO') != null){
      this.calculatorService.setPricesByDTO(JSON.parse(localStorage.getItem('pricesDTO')!));
    } else {
      // setting initial values
      this.calculatorService.setPricesByDTO(
        {
          price: 200,
          patchDiameterPrice: 150,

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
  onValChange(val: boolean) {
    if (this.isInternalOrder != val) {
      this.isInternalOrder = val;
      this.calculatorService.setInternal(this.isInternalOrder);
    }
  }
  addToBasket(event: BasketItem) {
    this.basket.addToBasket(event);
  }
}
