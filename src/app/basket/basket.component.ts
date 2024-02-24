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
  @Input() isDialog = false;

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.refreshBasket();
  }

  addToBasket(itemToAdd: BasketItem) {
    this.basketService.addToBasket(itemToAdd);
    this.refreshBasket();
    console.log(this.basket, this.basketService.getBasket())
  }
  empty() {
    this.basket = [];
    this.sumSumPrice = 0;
    this.basketService.emptyBasket();
    this.refreshBasket();
  }
  refreshBasket() {
    this.basket = this.basketService.getBasket();
    this.basket.forEach(item => this.sumSumPrice += item.sumPrice);
  }


}
