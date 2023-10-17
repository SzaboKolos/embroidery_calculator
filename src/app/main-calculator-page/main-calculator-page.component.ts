import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { CalculatorService } from '../calc-service/CalculatorService';
import { SettingsPatchComponent } from '../settings/settings-patch/settings-patch.component';
import { PricesDTO } from '../models/prices-dto';
import {PatchTypeComponent} from "../types/patch-type/patch-type.component";

@Component({
  selector: 'app-main-calculator-page',
  templateUrl: './main-calculator-page.component.html',
  styleUrls: ['./main-calculator-page.component.scss'],
})
export class MainCalculatorPageComponent {
  isBetaVersion = true;
  version = '1.2.0'
  settingsOpenState = false;
  isInternalOrder = true;

  @ViewChild(PatchTypeComponent) patchTypeComponent!: PatchTypeComponent;

  constructor(private calculatorService: CalculatorService){
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
      this.patchTypeComponent.setHint(this.isInternalOrder);
    }
   }
}
