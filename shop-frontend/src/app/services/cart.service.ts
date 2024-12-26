import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart, CartItem } from '../interfaces/cart.interface';
import { Product } from '../interfaces/product.interface';

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

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const currentCart = this.cart$.value;
    const updatedItems = currentCart.items.map(item => 
      item.productId === productId 
        ? { ...item, quantity } 
        : item
    );

    const updatedCart = {
      items: updatedItems,
      total: this.calculateTotal(updatedItems)
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

  clearCart(): void {
    const emptyCart: Cart = { items: [], total: 0 };
    this.cart$.next(emptyCart);
    this.saveCartToStorage(emptyCart);
  }

  private calculateTotal(items: CartItem[]): number {
    return items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }
}