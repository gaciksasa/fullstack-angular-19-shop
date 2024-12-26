import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  getUniqueCategories(products: Product[]): string[] {
    return [...new Set(products.map(product => product.category))];
  }

  getProductsByCategory(products: Product[], category: string): Product[] {
    return products.filter(product => product.category === category);
  }
}