import { reactive } from 'vue';

const CART_STORAGE_KEY = 'cart_items';

function loadCartFromStorage() {
  const storedCart = localStorage.getItem(CART_STORAGE_KEY);
  return storedCart ? JSON.parse(storedCart) : [];
}

function saveCartToStorage(items) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

export const cartStore = reactive({
  items: loadCartFromStorage(),
  addItem(product) {
    const item = this.items.find((item) => item.id === product.id);
    if (item) {
      item.quantity++;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }
    saveCartToStorage(this.items);
  },
  removeItem(productId) {
    this.items = this.items.filter((item) => item.id !== productId);
    saveCartToStorage(this.items);
  },
  incrementQuantity(productId) {
    const item = this.items.find((item) => item.id === productId);
    if (item) {
      item.quantity++;
    }
    saveCartToStorage(this.items);
  },
  decrementQuantity(productId) {
    const item = this.items.find((item) => item.id === productId);
    if (item && item.quantity > 1) {
      item.quantity--;
    }
    saveCartToStorage(this.items);
  },
  clearCart() {
    this.items = [];
    saveCartToStorage(this.items);
  },
  get totalBill() {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }
});
