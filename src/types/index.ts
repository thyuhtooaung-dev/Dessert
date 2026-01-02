interface ImageSources {
  mobile: string;
  tablet: string;
  desktop: string;
  thumbnail: string;
}

export interface Product {
  image: ImageSources;
  name: string;
  category: string;
  price: number;
}

export interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  updateQuantity: (name: string, delta: number, price?: number) => void;
  removeFromCart: (name: string) => void;
  clearCart: () => void;
}

export interface AddToCartProps {
  count: number;
  setCount: (newCount: number | ((prev: number) => number)) => void;
}

export interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

export interface OrderConfirmProps {
  items: CartItem[];
  totalPrice: number;
  onClose: () => void;
}

export interface ConfirmItem extends CartItem {
  image?: string;
}
