import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BasketService } from 'src/app/services/basket-service';
import { BasketComponent } from '../basket.component';

@Component({
  selector: 'app-basket-dialog',
  templateUrl: './basket-dialog.component.html',
  styleUrls: ['./basket-dialog.component.scss']
})
export class BasketDialogComponent {
  @ViewChild(BasketComponent) basketComponent!: BasketComponent;
  constructor(
    public dialogRef: MatDialogRef<BasketDialogComponent>,
    private basketService: BasketService
  ) {}

  close() {
    this.dialogRef.close();
  }
  emptyBasket() {
    this.basketComponent.empty();
  }
}
