import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart, CartItem } from '../interfaces/cart.interface';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart$ = new BehaviorSubject<Cart>({ items: [], total: 0 });

  getCart(): Observable<Cart> {
    return this.cart$.asObservable();
  }

  addToCart(product: Product, quantity: number = 1): void {
    const currentCart = this.cart$.value;
    const existingItem = currentCart.items.find(item => item.productId === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      currentCart.items.push({
        productId: product.id,
        title: product.title,
        price: product.price,
        quantity: quantity,
        thumbnail: product.thumbnail
      });
    }

    currentCart.total = this.calculateTotal(currentCart.items);
    this.cart$.next(currentCart);
  }

  removeFromCart(productId: number): void {
    const currentCart = this.cart$.value;
    currentCart.items = currentCart.items.filter(item => item.productId !== productId);
    currentCart.total = this.calculateTotal(currentCart.items);
    this.cart$.next(currentCart);
  }

  updateQuantity(productId: number, quantity: number): void {
    const currentCart = this.cart$.value;
    const item = currentCart.items.find(item => item.productId === productId);
    if (item) {
      item.quantity = quantity;
      currentCart.total = this.calculateTotal(currentCart.items);
      this.cart$.next(currentCart);
    }
  }

  private calculateTotal(items: CartItem[]): number {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}