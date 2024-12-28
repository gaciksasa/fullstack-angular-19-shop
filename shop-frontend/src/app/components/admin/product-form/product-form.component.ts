import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../interfaces/product.interface';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent implements OnInit {
  product: Product = {
    id: 0,
    title: '',
    description: '',
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    brand: '',
    category: '',
    sku: '',
    weight: 0,
    dimensions: {
      width: 0,
      height: 0,
      depth: 0
    },
    warrantyInformation: '',
    shippingInformation: '',
    availabilityStatus: 'In Stock',
    returnPolicy: '',
    minimumOrderQuantity: 1,
    tags: [],
    thumbnail: '',
    images: []
  };
  isEditing = false;
  loading = false;
  error = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditing = true;
      this.loadProduct(id);
    }
  }

  private loadProduct(id: string): void {
    this.loading = true;
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.product = product;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error loading product';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    this.loading = true;
    const operation = this.isEditing
      ? this.productService.updateProduct(this.product.id!.toString(), this.product)
      : this.productService.createProduct(this.product);

    operation.subscribe({
      next: () => {
        this.router.navigate(['/admin/products']);
      },
      error: (error) => {
        this.error = 'Error saving product';
        this.loading = false;
      }
    });
  }

  onTagsChange(value: string): void {
    this.product.tags = value.split(',').map(tag => tag.trim()).filter(tag => tag);
  }
}