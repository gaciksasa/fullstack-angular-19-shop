import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { ProductListAdminComponent } from './components/admin/product-list-admin/product-list-admin.component';
import { ProductFormComponent } from './components/admin/product-form/product-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'order-success', component: OrderSuccessComponent },
  {
    path: 'admin',
    children: [
      { path: '', component: DashboardComponent },
      { path: 'products', component: ProductListAdminComponent },
      { path: 'products/new', component: ProductFormComponent },
      { path: 'products/edit/:id', component: ProductFormComponent }
    ]
  }
];