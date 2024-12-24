import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product!: Product;

  getStockStatusClass(): string {
    if (this.product.availabilityStatus === 'In Stock') {
      return 'text-green-500';
    } else if (this.product.availabilityStatus === 'Low Stock') {
      return 'text-orange-500';
    }
    return 'text-red-500';
  }
}