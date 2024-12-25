import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart, CartItem } from '../interfaces/cart.interface';
import { Product } from '../interfaces/product.interface';
import { calculatePrice, formatPrice } from '../utils/price.utils';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly CART_STORAGE_KEY = 'shop_cart';
  private cart$ = new BehaviorSubject<Cart>(this.loadCartFromStorage());

  constructor() {
    this.cart$.next(this.loadCartFromStorage());
  }

  private loadCartFromStorage(): Cart {
    const savedCart = localStorage.getItem(this.CART_STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : { items: [], total: 0 };
  }

  private saveCartToStorage(cart: Cart): void {
    localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(cart));
  }

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

    const updatedCart = {
      items: [...currentCart.items],
      total: this.calculateTotal(currentCart.items)
    };

    this.cart$.next(updatedCart);
    this.saveCartToStorage(updatedCart);
  }

  removeFromCart(productId: number): void {
    const currentCart = this.cart$.value;
    const updatedCart = {
      items: currentCart.items.filter(item => item.productId !== productId),
      total: 0
    };
    updatedCart.total = this.calculateTotal(updatedCart.items);
    
    this.cart$.next(updatedCart);
    this.saveCartToStorage(updatedCart);
  }

  private calculateTotal(items: CartItem[]): number {
    return items.reduce((total, item) => {
      const itemTotal = calculatePrice(item.price, item.quantity);
      return total + itemTotal;
    }, 0);
  }
}