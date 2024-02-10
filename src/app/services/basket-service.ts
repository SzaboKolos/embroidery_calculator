import { Injectable } from "@angular/core";

import {BasketItem} from "../models/basket-item";
@Injectable({
  providedIn: 'root',
})
export class BasketService {
  basketContent: BasketItem[] = [];

  addToBasket(itemToAdd: BasketItem) {
    let basketContentTemp: BasketItem[] = this.getBasket();
    if (!basketContentTemp) {
      localStorage.setItem('basketContent',JSON.stringify([itemToAdd]));
    } else {
      basketContentTemp.push(itemToAdd);
      localStorage.setItem('basketContent',JSON.stringify(basketContentTemp));
    }
    console.log("ls:", this.getBasket());
    console.log("normal:",this.basketContent)
  }
  getBasket(): BasketItem[] {
    if (localStorage.getItem('basketContent')){
      this.basketContent = JSON.parse(localStorage.getItem('basketContent')!) as BasketItem[];
    }
    return this.basketContent;
  }
  emptyBasket() {
    localStorage.setItem('basketContent','');
  }
}
