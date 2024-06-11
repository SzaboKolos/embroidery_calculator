import { Component } from '@angular/core';

@Component({
  selector: 'app-house-swatch',
  templateUrl: './house-swatch.component.html',
  styleUrls: ['./house-swatch.component.scss']
})
export class HouseSwatchComponent {
  cards = Array(3).fill(0); // Assuming you have 3 cards, adjust accordingly
  hoveredCardIndex: number | null = null;
  placeholderLeft = 0;
  placeholderTop = 0;

  onCardHover(index: number): void {
    this.hoveredCardIndex = index;
  }

  onCardHoverEnd(): void {
    this.hoveredCardIndex = null;
    this.placeholderLeft = 0;
    this.placeholderTop = 0;
  }
}
