import { reactive } from 'vue'

export const cartStore = reactive({
  items: [],
  addItem(product) {
    const item = this.items.find((item) => item.id === product.id)
    if (item) {
      item.quantity++
    } else {
      this.items.push({ ...product, quantity: 1 })
    }
  },
  removeItem(productId) {
    this.items = this.items.filter((item) => item.id !== productId)
  },
  incrementQuantity(productId) {
    const item = this.items.find((item) => item.id === productId)
    if (item) {
      item.quantity++
    }
  },
  decrementQuantity(productId) {
    const item = this.items.find((item) => item.id === productId)
    if (item && item.quantity > 1) {
      item.quantity--
    }
  },
  get totalBill() {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0)
  }
})
