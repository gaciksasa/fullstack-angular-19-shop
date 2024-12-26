import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { formatPrice } from '../../utils/price.utils';

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
  submitted = false;

  formData = {
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
    this.cart$.subscribe(cart => {
      if (cart.items.length === 0) {
        this.router.navigate(['/products']);
      }
    });
  }

  onSubmit(form: NgForm): void {
    this.submitted = true;

    if (form.valid) {
      this.isProcessing = true;
      
      // Simulate order processing
      setTimeout(() => {
        this.cartService.clearCart();
        this.isProcessing = false;
        this.router.navigate(['/order-success']);
      }, 2000);
    }
  }

  // Validation helpers
  validateCardNumber(number: string): boolean {
    return /^\d{16}$/.test(number.replace(/\s/g, ''));
  }

  validateCardExpiry(expiry: string): boolean {
    return /^\d{2}\/\d{2}$/.test(expiry);
  }

  validateCardCvv(cvv: string): boolean {
    return /^\d{3,4}$/.test(cvv);
  }

  validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}