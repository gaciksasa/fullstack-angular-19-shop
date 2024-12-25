import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { formatPrice } from '../../utils/price.utils';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent {
  @Input() isVisible = false;
  @Output() closeCart = new EventEmitter<void>();
  
  cart$ = this.cartService.getCart();
  formatPrice = formatPrice;

  constructor(private cartService: CartService) {}

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  onClose(): void {
    this.closeCart.emit();
  }
}