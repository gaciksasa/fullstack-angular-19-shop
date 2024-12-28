import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../interfaces/product.interface';

@Component({
  selector: 'app-product-list-admin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list-admin.component.html'
})
export class ProductListAdminComponent implements OnInit {
  products: Product[] = [];
  loading = false;
  error = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.products = response.products;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error loading products';
        this.loading = false;
      }
    });
  }

  editProduct(productId: number | undefined): void {
    if (productId) {
      // Navigate to edit page
      window.location.href = `/admin/products/edit/${productId}`;
    }
  }

  deleteProduct(productId: number | undefined): void {
    if (productId && confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId.toString()).subscribe({
        next: () => {
          this.loadProducts(); // Reload the list
        },
        error: (err) => {
          this.error = 'Error deleting product';
        }
      });
    }
  }
}