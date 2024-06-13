<script>
import axios from 'axios'
import DetailsView from './DetailsView.vue'
import AddProduct from './AddProduct.vue'
import { cartStore } from '../stores/cartStore'
import AddCategory from './AddCategory.vue'

export default {
  components: {
    DetailsView,
    AddProduct,
    AddCategory
  },
  data() {
    return {
      posts: null,
      categories: null,
      selectedProduct: null,
      showModal: false,
      showAddProductModal: false,
      showAddCategoryModal: false,
      showDropdown: false
    }
  },
  async mounted() {
    this.posts = await this.fetchProducts()
    this.categories = await this.fetchCategories()
  },
  methods: {
    async fetchProducts() {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/product`, {
        headers: {
          Authorization: localStorage.getItem('auth')
        }
      })
      return response.data.data
    },
    async fetchCategories() {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/category`, {
        headers: {
          Authorization: localStorage.getItem('auth')
        }
      })
      return response.data.data
    },
    async detailsProduct(productId) {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/product/${productId}`, {
        headers: {
          Authorization: localStorage.getItem('auth')
        }
      })
      this.selectedProduct = response.data.data
      this.showModal = true
    },
    async deleteProduct(productId) {
      try {
        await axios.delete(`${import.meta.env.VITE_BASE_URL}/product/${productId}`, {
          headers: {
            Authorization: localStorage.getItem('auth')
          }
        })
        this.posts = this.posts.filter((post) => post.id !== productId)
      } catch (error) {
        console.error('Failed to delete the product:', error)
      }
    },
    closeModal() {
      this.showModal = false
      this.selectedProduct = null
    },
    async productAdded() {
      this.posts = await this.fetchProducts()
    },
    async categoryAdded() {
      this.categories = await this.fetchCategories()
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
    <nav class="relative flex justify-between p-5 text-white bg-blue-600 px-36">
      <h1 class="font-bold text-l">MASPOS</h1>
      <div class="relative flex items-center justify-end gap-2">
        <div class="relative" @click="toggleDropdown">
          <div class="flex items-center cursor-pointer">
            <div>Taufik00</div>
            <img src="https://source.unsplash.com/random/?person" class="object-cover ml-2 rounded-full size-8"
              alt="Profile" />
          </div>
          <div v-if="showDropdown" class="absolute right-0 z-10 w-48 mt-2 bg-white rounded-md shadow-lg">
            <button @click="logout"
              class="block w-full px-4 py-2 text-sm font-medium text-left text-blue-500 rounded-md hover:bg-gray-50">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
    <main>
      <div class="flex items-center justify-end gap-3 pt-10 px-36">
        <AddCategory @categoryAdded="categoryAdded" />
        <AddProduct @productAdded="productAdded" />
        <button class="px-4 py-2 text-sm font-semibold text-blue-100 bg-blue-500 rounded hover:bg-blue-600"
          @click="$router.push('/checkout')">
          Cart
        </button>
      </div>

      <div class="flex flex-wrap my-4 mx-36">
        <button v-for="category in categories" :key="category.id" class="px-4 py-1 font-medium border-b-2">
          {{ category.name }}
        </button>
        <div class="flex-1 border-b-2"></div>
      </div>
      <div class="max-w-2xl px-4 py-6 mx-auto sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
        <div class="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-5 xl:gap-x-8">
          <div v-for="post in posts" :key="post.id" class="overflow-hidden rounded-lg shadow">
            <img :src="post.picture_url" class="aspect-[200/165] object-cover" @click="detailsProduct(post.id)" />
            <div class="p-3">
              <div class="flex items-center justify-between">
                <div class="text-sm font-medium">{{ post.name }}</div>
                <button @click="deleteProduct(post.id)" class="px-2 py-1 text-xs text-white bg-red-600 rounded">
                  Delete
                </button>
              </div>
              <div class="text-sm font-bold">Rp.{{ post.price.toLocaleString() }}</div>
              <div class="flex justify-center mt-5">
                <button @click="addToCart(post)"
                  class="w-full px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 sm:max-w-32">
                  + Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-end mt-10">
          <button class="px-4 py-2 font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
            @click="$router.push('/checkout')">
            Total Bill : Rp.{{ totalBill.toLocaleString() }}
          </button>
        </div>
      </div>
    </main>
    <DetailsView v-if="showModal" :product="selectedProduct" @close="closeModal"></DetailsView>
  </div>
</template>
