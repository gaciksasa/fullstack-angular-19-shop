export const calculatePrice = (price: number, quantity: number): number => {
    // Convert to cents, do the calculation, then convert back to dollars
    const inCents = Math.round(price * 100) * quantity;
    return inCents / 100;
  };
  
  export const formatPrice = (price: number): string => {
    return price.toFixed(2);
  };