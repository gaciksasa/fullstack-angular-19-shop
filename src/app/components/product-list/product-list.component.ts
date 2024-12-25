import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product.interface';
import { ProductCardComponent } from '../product-card/product-card.component';

interface SortOption {
  label: string;
  value: string;
  compareFn: (a: Product, b: Product) => number;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  selectedCategories: Set<string> = new Set();
  currentSort: string = 'default';
  loading = true;
  error = '';

  sortOptions: SortOption[] = [
    {
      label: 'Default',
      value: 'default',
      compareFn: () => 0
    },
    {
      label: 'Price: Low to High',
      value: 'price_asc',
      compareFn: (a, b) => a.price - b.price
    },
    {
      label: 'Price: High to Low',
      value: 'price_desc',
      compareFn: (a, b) => b.price - a.price
    },
    {
      label: 'Rating',
      value: 'rating',
      compareFn: (a, b) => b.rating - a.rating
    },
    {
      label: 'Name: A-Z',
      value: 'name_asc',
      compareFn: (a, b) => a.title.localeCompare(b.title)
    },
    {
      label: 'Name: Z-A',
      value: 'name_desc',
      compareFn: (a, b) => b.title.localeCompare(a.title)
    }
  ];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.products = response.products;
        this.filteredProducts = this.products;
        this.categories = [...new Set(this.products.map(product => product.category))];
        this.loading = false;
        this.applyFiltersAndSort();
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.error = 'Error loading products. Please try again later.';
        this.loading = false;
      }
    });
  }

  toggleCategory(category: string): void {
    if (this.selectedCategories.has(category)) {
      this.selectedCategories.delete(category);
    } else {
      this.selectedCategories.add(category);
    }
    this.applyFiltersAndSort();
  }

  onSortChange(sortValue: string): void {
    this.currentSort = sortValue;
    this.applyFiltersAndSort();
  }

  private applyFiltersAndSort(): void {
    // First apply category filters
    if (this.selectedCategories.size === 0) {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter(product => 
        this.selectedCategories.has(product.category)
      );
    }

    // Then apply sorting
    const sortOption = this.sortOptions.find(option => option.value === this.currentSort);
    if (sortOption) {
      this.filteredProducts.sort(sortOption.compareFn);
    }
  }

  isCategorySelected(category: string): boolean {
    return this.selectedCategories.has(category);
  }
}