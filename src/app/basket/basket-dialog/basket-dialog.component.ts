import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BasketService } from 'src/app/services/basket-service';
import { BasketComponent } from '../basket.component';
import { BasketItem } from 'src/app/models/basket-item';

@Component({
  selector: 'app-basket-dialog',
  templateUrl: './basket-dialog.component.html',
  styleUrls: ['./basket-dialog.component.scss']
})
export class BasketDialogComponent extends BasketComponent{
  constructor(
    public dialogRef: MatDialogRef<BasketDialogComponent>,
    protected override basketService: BasketService
  ) {
    super(basketService);
  }
  
  close() {
    this.dialogRef.close();
    this.basketService.getBasket();
  }
}
