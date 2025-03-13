import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CalculatorService } from 'src/app/services/calculator-service';
import { PricesDTO } from 'src/app/models/prices-dto';


@Component({
  selector: 'settings-patch',
  templateUrl: './settings-patch.component.html',
  styleUrls: ['./settings-patch.component.scss']
})
export class SettingsPatchComponent {
  ironPrice;
  price;
  broughtPrice;
  stitchPrice;
  stitchSulkyPrice;
  stitchGoldPrice;
  stitchTexPrice;

  multiplier;
  multiplierExt;

  constructor(private calculatorService: CalculatorService)
  {
      this.ironPrice = CalculatorService.getIronPrice();

      this.price = CalculatorService.getBasePrice();
      this.broughtPrice = CalculatorService.getBaseBroughtPrice();

      this.stitchPrice = CalculatorService.getNormalPrice()
      this.stitchSulkyPrice = CalculatorService.getSulkyPrice()
      this.stitchGoldPrice = CalculatorService.getGoldPrice()
      this.stitchTexPrice  = CalculatorService.getTexPrice()
      this.multiplier = CalculatorService.getMultiplier()
      this.multiplierExt = CalculatorService.getExternalMultiplier();
  }

  priceNormal = new FormControl(1, Validators.compose([ Validators.required, Validators.pattern("^[\.0-9]*$"), Validators.min(0)]));
  priceSulky = new FormControl(1, Validators.compose([ Validators.required, Validators.pattern("^[\.0-9]*$"), Validators.min(0)]));
  priceGold= new FormControl(8, Validators.compose([ Validators.required, Validators.pattern("^[\.0-9]*$"), Validators.min(0)]));
  priceTex= new FormControl(8, Validators.compose([ Validators.required, Validators.pattern("^[\.0-9]*$"), Validators.min(0)]));

  priceBase = new FormControl(200, Validators.compose([ Validators.required,Validators.pattern("^[\.0-9]*$")]));
  priceBroughtBase = new FormControl(500, Validators.compose([ Validators.required,Validators.pattern("^[\.0-9]*$")]));
  priceMultiplier= new FormControl(1, Validators.compose([Validators.required, Validators.pattern("^[\.0-9]*$"), Validators.min(0.01)]));
  priceMultiplierExternal = new FormControl(2, Validators.compose([Validators.required, Validators.pattern("^[\.0-9]*$"), Validators.min(0.01)]));

  priceIron = new FormControl(50, Validators.compose([ Validators.required,Validators.pattern("^[\.0-9]*$")]));


  set(){
    if (this.priceBase.valid && this.priceBroughtBase.valid && this.priceMultiplier.valid && this.priceNormal.valid && this.priceSulky.valid && this.priceGold.valid && this.priceTex.valid && this.priceIron.valid){
      let pricesDTO: PricesDTO = {
        ironPrice: +this.ironPrice.value!,

        price: +this.priceBase.value!,
        broughtPrice: +this.priceBroughtBase.value!,

        stitchPrice: +this.priceNormal.value!,
        stitchSulkyPrice: +this.priceSulky.value!,
        stitchGoldPrice: +this.priceGold.value!,
        stitchTexPrice: +this.priceTex.value!,

        multiplier: +this.priceMultiplier.value!,
        externalMultiplier: +this.priceMultiplierExternal.value!
      }
      CalculatorService.setPricesByDTO(pricesDTO);
    }
  }
  reset(){
    let pricesDTO: PricesDTO = {
      ironPrice: 50,
      price: 200,
      broughtPrice: 500,

      stitchPrice: 1,
      stitchSulkyPrice: 1,
      stitchGoldPrice: 8,
      stitchTexPrice: 8,

      multiplier: 1,
      externalMultiplier: 2
    }
    this.priceNormal.setValue(pricesDTO.stitchPrice);
    this.priceSulky.setValue(pricesDTO.stitchSulkyPrice);
    this.priceGold.setValue(pricesDTO.stitchGoldPrice);
    this.priceTex.setValue(pricesDTO.stitchTexPrice);

    this.priceBase.setValue(pricesDTO.price);
    this.priceBroughtBase.setValue(pricesDTO.broughtPrice);
    this.priceMultiplier.setValue(pricesDTO.multiplier);
    this.priceMultiplierExternal.setValue(pricesDTO.externalMultiplier);

    CalculatorService.setPricesByDTO(pricesDTO);
  }

}
