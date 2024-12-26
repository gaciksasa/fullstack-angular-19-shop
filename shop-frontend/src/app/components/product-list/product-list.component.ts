import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product.interface';
import { ProductCardComponent } from '../product-card/product-card.component';
import { 
  trigger, 
  style, 
  animate, 
  transition, 
  query, 
  stagger 
} from '@angular/animations';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  animations: [
    trigger('listAnimation', [
      transition('* <=> *', [
        query(':enter', [
          style({ opacity: 0, transform: 'scale(0.95)' }),
          stagger('30ms', [
            animate('200ms ease-out', 
              style({ opacity: 1, transform: 'scale(1)' })
            )
          ])
        ], { optional: true }),
        query(':leave', [
          stagger('30ms', [
            animate('200ms ease-out', 
              style({ opacity: 0, transform: 'scale(0.95)' })
            )
          ])
        ], { optional: true })
      ])
    ]),
    trigger('fadeSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('200ms ease-out', 
          style({ opacity: 1, transform: 'translateY(0)' })
        )
      ])
    ])
  ]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  selectedCategories: Set<string> = new Set();
  currentSort: string = 'default';
  searchTerm: string = '';
  loading = true;
  error = '';

  sortOptions = [
    { label: 'Default', value: 'default' },
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
    { label: 'Rating', value: 'rating' },
    { label: 'Name: A-Z', value: 'name_asc' },
    { label: 'Name: Z-A', value: 'name_desc' }
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

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.applyFiltersAndSort();
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
    // First, apply search filter
    let filtered = this.products;
    if (this.searchTerm?.trim()) {
        const search = this.searchTerm.toLowerCase().trim();
        filtered = filtered.filter(product => 
            (product.title?.toLowerCase() || '').includes(search) ||
            (product.description?.toLowerCase() || '').includes(search) ||
            (product.category?.toLowerCase() || '').includes(search) ||
            (product.brand?.toLowerCase() || '').includes(search)
        );
    }

    // Then apply category filter
    if (this.selectedCategories.size > 0) {
        filtered = filtered.filter(product => 
            product.category && this.selectedCategories.has(product.category)
        );
    }

    // Finally, apply sorting
    switch (this.currentSort) {
        case 'price_asc':
            filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
            break;
        case 'price_desc':
            filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
            break;
        case 'rating':
            filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
            break;
        case 'name_asc':
            filtered.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
            break;
        case 'name_desc':
            filtered.sort((a, b) => (b.title || '').localeCompare(a.title || ''));
            break;
    }

    this.filteredProducts = filtered;
}

  isCategorySelected(category: string): boolean {
    return this.selectedCategories.has(category);
  }
}