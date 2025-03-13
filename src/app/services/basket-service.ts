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
      localStorage.setItem('basketContent', JSON.stringify([itemToAdd]));
    } else {
      basketContentTemp.push(itemToAdd);
      localStorage.setItem('basketContent', JSON.stringify(basketContentTemp));
    }
  }
  getBasket(): BasketItem[] {
    if (localStorage.getItem('basketContent')){
      this.basketContent = JSON.parse(localStorage.getItem('basketContent')!) as BasketItem[];
    }
    return this.basketContent;
  }
  emptyBasket() {
    this.basketContent = [];
    localStorage.removeItem('basketContent');    
  }
}
