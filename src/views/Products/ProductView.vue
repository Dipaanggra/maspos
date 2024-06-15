<script>
import AddProduct from '../AddProduct.vue'
import { cartStore } from '@/stores/cartStore'
import { useProductStore } from '@/stores/productStore'
import AddCategory from '../AddCategory.vue'
import ProductCard from './ProductCard.vue'
import { useCategoryStore } from '@/stores/categoryStore'
import ProductDetail from './ProductDetail.vue'

export default {
  components: {
    ProductDetail,
    AddProduct,
    AddCategory,
    ProductCard
  },
  data() {
    return {
      productStore: useProductStore(),
      categoryStore: useCategoryStore(),
      detailProduct: false,
      showDropdown: false
    }
  },
  async mounted() {
    this.productStore.fetchProducts()
    this.categoryStore.fetchCategories()
  },
  methods: {

    async deleteProduct(productId) {
      this.productStore.deleteProduct(productId)
    },
    async showDetailProduct(product) {
      this.productStore.post = product
      this.detailProduct = true
    },
    closeModal() {
      this.showModal = false
      this.selectedProduct = null
    },
    async productAdded() {
      this.productStore.fetchProducts()
    },
    async categoryAdded() {
      this.categoryStore.fetchCategories()
    },
    addToCart(product) {
      cartStore.addItem(product)
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown
    },
    logout() {
      localStorage.removeItem('auth')
      this.$router.push('/login')
    }
  },
  computed: {
    cartItems() {
      return cartStore.items
    },
    totalBill() {
      return cartStore.totalBill
    }
  }
}
</script>

<template>
  <div class="bg-white">
    <div class="sticky top-0 bg-white">
      <nav class="relative flex justify-between p-5 text-white bg-yellow-500 px-36">
        <img src="/e-shop.png" class="items-start h-8" alt="">
        <div class="relative flex items-center justify-end gap-2">
          <div class="relative" @click="toggleDropdown">
            <div class="flex items-center cursor-pointer">
              <div>Taufik00</div>
              <img src="https://i.pravatar.cc/300" class="object-cover ml-2 rounded-full size-8" alt="Profile" />
            </div>
            <div v-if="showDropdown" class="absolute right-0 z-10 w-48 mt-2 bg-white rounded-md shadow-lg">
              <button @click="logout"
                class="block w-full px-4 py-2 text-sm font-medium text-left text-yellow-500 rounded-md hover:bg-gray-50">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div class="flex items-center justify-end gap-3 pt-10 px-36">
        <AddCategory @categoryAdded="categoryAdded" />
        <AddProduct @productAdded="productAdded" />
        <button class="px-4 py-2 text-sm font-semibold text-yellow-100 bg-yellow-400 rounded hover:bg-yellow-500"
          @click="$router.push('/checkout')">
          Cart
        </button>
      </div>
      <div class="flex flex-wrap my-4 mx-36">
        <button v-for="category in categoryStore.categories" :key="category.id"
          class="px-4 py-1 font-medium border-b-2">
          {{ category.name }}
        </button>
        <div class="flex-1 border-b-2"></div>
      </div>
    </div>
    <main>

      <div class="max-w-2xl px-4 py-6 mx-auto sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
        <div class="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-5 xl:gap-x-8">
          <ProductCard v-for="post in productStore.posts" @addToCart="addToCart" :key="post.id" :post="post"
            @deleteProduct="deleteProduct" @detailProducts="showDetailProduct" />
        </div>
      </div>
    </main>
    <div class="flex justify-end py-5 sticky bottom-0 max-w-screen px-36 bg-white">
      <button class="px-4 py-2 font-medium text-white bg-yellow-400 rounded hover:bg-yellow-500"
        @click="$router.push('/checkout')">
        Total Bill : Rp.{{ totalBill.toLocaleString() }}
      </button>
    </div>
    <ProductDetail :isOpen="detailProduct" :product="productStore.post" @update:isOpen="detailProduct = $event" />
  </div>
</template>
