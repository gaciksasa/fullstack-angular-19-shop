export interface CartItem {
    productId: number;
    title: string;
    price: number;
    quantity: number;
    thumbnail: string;
  }
  
  export interface Cart {
    items: CartItem[];
    total: number;
  }