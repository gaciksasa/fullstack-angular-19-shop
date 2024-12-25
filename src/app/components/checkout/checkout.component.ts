import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { formatPrice } from '../../utils/price.utils';

interface CheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  country: string;
  zip: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  cart$ = this.cartService.getCart();
  formatPrice = formatPrice;
  isProcessing = false;

  formData: CheckoutForm = {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    country: '',
    zip: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: ''
  };

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Check if cart is empty
    this.cart$.subscribe(cart => {
      if (cart.items.length === 0) {
        this.router.navigate(['/products']);
      }
    });
  }

  onSubmit(): void {
    this.isProcessing = true;

    // Simulate order processing
    setTimeout(() => {
      // Clear cart after successful order
      this.cartService.clearCart();
      this.isProcessing = false;
      this.router.navigate(['/order-success']);
    }, 2000);
  }
}