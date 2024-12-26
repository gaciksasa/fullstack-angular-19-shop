import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product.interface';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.loadProduct(id);
    });
  }

  private loadProduct(id: string): void {
    this.loading = true;
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.product = product;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading product:', error);
        this.error = 'Error loading product details. Please try again later.';
        this.loading = false;
      }
    });
  }

  getStockStatusClass(): string {
    if (!this.product) return '';
    
    if (this.product.availabilityStatus === 'In Stock') {
      return 'text-green-500';
    } else if (this.product.availabilityStatus === 'Low Stock') {
      return 'text-orange-500';
    }
    return 'text-red-500';
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product);
    }
  }
}