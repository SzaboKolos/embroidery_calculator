import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { CalculatorService } from '../calc-service/CalculatorService';
import { SettingsPatchComponent } from '../settings/settings-patch/settings-patch.component';
import { PricesDTO } from '../modules/prices-dto';

@Component({
  selector: 'app-main-calculator-page',
  templateUrl: './main-calculator-page.component.html',
  styleUrls: ['./main-calculator-page.component.scss'],
})
export class MainCalculatorPageComponent {
  isBetaVersion = true;
  settingsOpenState = false;
  isInternalOrder = true;

  constructor(private calculatorService: CalculatorService){
    if (localStorage.getItem('pricesDTO') != null){
      this.calculatorService.setPricesByDTO(JSON.parse(localStorage.getItem('pricesDTO')!));
    } else {
      // setting initial values
      this.calculatorService.setPricesByDTO(
        {
          price: 400,
          patchDiameterPrice: 400,

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
}
