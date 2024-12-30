import {Component, ViewChild} from '@angular/core';
import { CalculatorService } from '../services/calculator-service';
import {PatchTypeComponent} from "../types/patch-type/patch-type.component";
import {BeanieTypeComponent} from "../types/beanie-type/beanie-type.component";
import {ShirtTypeComponent} from "../types/shirt-type/shirt-type.component";
import {BasketService} from "../services/basket-service";
import {BasketComponent} from "../basket/basket.component";
import {BasketItem} from "../models/basket-item";
import { MatDialog } from '@angular/material/dialog';
import { BasketDialogComponent } from '../basket/basket-dialog/basket-dialog.component';
import { UpdatesDialogComponent } from '../updates-dialog/updates-dialog.component';

@Component({
  selector: 'app-main-calculator-page',
  templateUrl: './main-calculator-page.component.html',
  styleUrls: ['./main-calculator-page.component.scss'],
})
export class MainCalculatorPageComponent {
  isBetaVersion = true;
  version = '3.2.37'
  settingsOpenState = false;
  category = 0;
  link = 'https://www.youtube.com/watch?v=Y1TlT1sbM8E&t=18s' //https://www.youtube.com/watch?v=dQw4w9WgXcQ

  @ViewChild(PatchTypeComponent) patchTypeComponent!: PatchTypeComponent;
  @ViewChild(ShirtTypeComponent) shirtTypeComponent!: ShirtTypeComponent;
  @ViewChild(BeanieTypeComponent) sweaterTypeComponent!: BeanieTypeComponent;
  @ViewChild(BasketComponent) basket!: BasketComponent;

  constructor(private calculatorService: CalculatorService,
              private basketService: BasketService,
              private dialog: MatDialog){
    // opening update message if there's any unopened updates
    console.log(localStorage.getItem('version'));
    
    if (localStorage.getItem('version') == null || localStorage.getItem('version') != this.version) { 
    
      this.dialog.open(UpdatesDialogComponent,
        {
          //minHeight: 'auto',
          height: 'auto',
          width: '100%',
          panelClass: 'basket-panel',
          data: {}
        });

      localStorage.setItem('version', this.version);
    }

    if (localStorage.getItem('pricesDTO') != null) {
      CalculatorService.setPricesByDTO(JSON.parse(localStorage.getItem('pricesDTO')!));
      // handling the new 'broughtPrice' value on devices that used the webapp before the update
      if (!JSON.parse(localStorage.getItem('pricesDTO')!).broughtPrice != null) {
        return;
      }
    }
    // setting initial values
    CalculatorService.setPricesByDTO(
      {
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
    );
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
    this.dialog.open(BasketDialogComponent,
      {
        //minHeight: 'auto',
        height: 'auto',
        width: '100%',
        panelClass: 'basket-panel',
        data: {
          basket: this.basket
        }
      });
  }
  getTheme(theme?: string): boolean {
    if (localStorage.getItem('theme') == theme) {
      return true;
    }
    return false;
  }
  setTheme(theme?: string) {
    if (theme == null){
      localStorage.removeItem('theme');
      return;
    }
    localStorage.setItem('theme', theme);
  }
  changeTheme() {
    if (this.getTheme()) {
      this.setTheme('cat');
    } else {
      this.setTheme();
    }

  }
}
