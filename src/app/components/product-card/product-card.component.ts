import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../interfaces/product.interface';
import { 
  trigger, 
  state, 
  style, 
  animate, 
  transition 
} from '@angular/animations';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
  animations: [
    trigger('cardHover', [
      state('initial', style({
        transform: 'translateY(0)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
      })),
      state('hovered', style({
        transform: 'translateY(-5px)',
        boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)'
      })),
      transition('initial <=> hovered', [
        animate('200ms cubic-bezier(0.4, 0, 0.2, 1)')
      ])
    ])
  ]
})
export class ProductCardComponent {
  @Input() product!: Product;
  cardState = 'initial';

  onCardMouseEnter() {
    this.cardState = 'hovered';
  }

  onCardMouseLeave() {
    this.cardState = 'initial';
  }

  getStockStatusClass(): string {
    if (this.product?.availabilityStatus === 'In Stock') {
      return 'text-green-500';
    } else if (this.product?.availabilityStatus === 'Low Stock') {
      return 'text-orange-500';
    }
    return 'text-red-500';
  }
}