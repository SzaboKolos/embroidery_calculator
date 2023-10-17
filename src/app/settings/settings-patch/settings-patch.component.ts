import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CalculatorService } from 'src/app/calc-service/CalculatorService';
import { PricesDTO } from 'src/app/models/prices-dto';


@Component({
  selector: 'settings-patch',
  templateUrl: './settings-patch.component.html',
  styleUrls: ['./settings-patch.component.scss']
})
export class SettingsPatchComponent {
  constructor(private calculatorService: CalculatorService)
  {
      this.price = calculatorService.getBasePrice();
      this.patchDiameterPrice = calculatorService.getPatchDiameter()

      this.stitchPrice = calculatorService.getNormalPrice()
      this.stitchSulkyPrice = calculatorService.getSulkyPrice()
      this.stitchGoldPrice = calculatorService.getGoldPrice()
      this.stitchTexPrice  = calculatorService.getTexPrice()
      this.multiplier = calculatorService.getMultiplier()
      this.multiplierExt = calculatorService.getExternalMultiplier();
  }
  price;
  patchDiameterPrice;
  stitchPrice;
  stitchSulkyPrice;
  stitchGoldPrice;
  stitchTexPrice;

  multiplier;
  multiplierExt;


  priceNormal = new FormControl(0, Validators.compose([ Validators.required, Validators.pattern("^[\.0-9]*$"), Validators.min(0)]));
  priceSulky = new FormControl(0, Validators.compose([ Validators.required, Validators.pattern("^[\.0-9]*$"), Validators.min(0)]));
  priceGold= new FormControl(0, Validators.compose([ Validators.required, Validators.pattern("^[\.0-9]*$"), Validators.min(0)]));
  priceTex= new FormControl(0, Validators.compose([ Validators.required, Validators.pattern("^[\.0-9]*$"), Validators.min(0)]));

  priceBase = new FormControl(0, Validators.compose([ Validators.required,Validators.pattern("^[\.0-9]*$")]));
  priceMultiplier= new FormControl(1, Validators.compose([Validators.required, Validators.pattern("^[\.0-9]*$"), Validators.min(0.01)]));
  priceMultiplierExternal = new FormControl(1.35, Validators.compose([Validators.required, Validators.pattern("^[\.0-9]*$"), Validators.min(0.01)]));

  set(){
    if (this.priceBase.valid && this.priceMultiplier.valid && this.priceNormal.valid && this.priceSulky.valid && this.priceGold.valid && this.priceTex.valid){
      let pricesDTO: PricesDTO = {
        price: this.priceBase.value!,
        patchDiameterPrice: 100,

        stitchPrice: this.priceNormal.value!,
        stitchSulkyPrice: this.priceSulky.value!,
        stitchGoldPrice: this.priceGold.value!,
        stitchTexPrice: this.priceTex.value!,

        multiplier: this.priceMultiplier.value!,
        externalMultiplier: this.priceMultiplierExternal.value!
      }
      this.calculatorService.setPricesByDTO(pricesDTO);
    }
  }
  reset(){
    let pricesDTO: PricesDTO = {
      price: 200,
      patchDiameterPrice: 100,

      stitchPrice: 1,
      stitchSulkyPrice: 1,
      stitchGoldPrice: 8,
      stitchTexPrice: 8,

      multiplier: 1,
      externalMultiplier: 1.35
    }
    this.priceNormal.setValue(pricesDTO.stitchPrice);
    this.priceSulky.setValue(pricesDTO.stitchSulkyPrice);
    this.priceGold.setValue(pricesDTO.stitchGoldPrice);
    this.priceTex.setValue(pricesDTO.stitchTexPrice);

    this.priceBase.setValue(pricesDTO.price);
    this.priceMultiplier.setValue(pricesDTO.multiplier);
    this.priceMultiplierExternal.setValue(pricesDTO.externalMultiplier);

    this.calculatorService.setPricesByDTO(pricesDTO);
  }
}
