import {Component, Input, OnInit} from '@angular/core';
import {BasketService} from "../services/basket-service";
import {BasketItem} from "../models/basket-item";

@Component({
  selector: 'basket-component',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  basket: BasketItem[] = [];
  sumSumPrice: number = 0;

  constructor(protected basketService: BasketService) { }

  ngOnInit(): void {
    this.refreshBasket();
  }

  async addToBasket(itemToAdd: BasketItem) {
    this.basketService.addToBasket(itemToAdd);
    this.refreshBasket();
    console.log(this.basket, this.basketService.getBasket())
  }
  async empty() {
    this.basketService.emptyBasket();
    this.basket = [];
    this.sumSumPrice = 0;
    //this.refreshBasket();
  }
  async refreshBasket() {
    this.basket = this.basketService.getBasket();
    this.sumSumPrice = 0;
    this.basket.forEach(item => this.sumSumPrice += item.sumPrice);
  }
}
