<script setup>
import { useCategoryStore } from '@/stores/categoryStore';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
</script>
<script>
import axios from 'axios'

export default {
  components: {
    DialogPanel,
    DialogTitle
  },
  data() {
    return {
      isOpen: false,
      productName: '',
      price: '',
      category: '',
      image: null,
      categoryStore: useCategoryStore(),
      url: ''
    }
  },
  methods: {
    setIsOpen(value) {
      this.isOpen = value
    },
    async addProduct() {
      const formData = new FormData()
      formData.append('name', this.productName)
      formData.append('price', this.price)
      formData.append('category_id', this.category)
      formData.append('image', this.image)

      try {
        await axios.post(`${import.meta.env.VITE_BASE_URL}/product`, formData, {
          headers: {
            Authorization: localStorage.getItem('auth'),
            'Content-Type': 'multipart/form-data'
          }
        })
        this.setIsOpen(false)
        this.productName = ''
        this.price = ''
        this.category = ''
        this.image = null
        this.url = null
        this.$emit('productAdded')
      } catch (error) {
        console.error('Failed to add product:', error)
        this.setIsOpen(false)
      }
    },
    handleImageUpload(event) {
      this.image = event.target.files[0]
      this.url = URL.createObjectURL(this.image)
    }
  }
}
</script>
<style></style>
<template>
  <button @click="setIsOpen(true)"
    class="px-4 py-2 text-sm font-semibold text-yellow-800 bg-yellow-200 rounded hover:bg-yellow-300">
    + Add Product
  </button>
  <Dialog :open="isOpen" @close="setIsOpen" class="relative z-50">
    <!-- The backdrop, rendered as a fixed sibling to the panel container -->
    <div class="fixed inset-0 bg-black/30" aria-hidden="true" />

    <!-- Full-screen container to center the panel -->
    <div class="fixed inset-0 flex items-center justify-center w-screen p-4">
      <!-- The actual dialog panel -->
      <DialogPanel class="w-full max-w-xl bg-white rounded">
        <DialogTitle class="flex justify-between p-4 border-b">
          <div class="text-xl font-bold">Add Product</div>
          <button @click="setIsOpen(false)">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="lucide lucide-x">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </DialogTitle>
        <form v-on:submit.prevent="addProduct">
          <div class="grid gap-3 p-4 md:grid-cols-2">
            <div class="">
              <label :style="{ 'background-image': `url(${url})` }" :class="!url ? ' border-2' : ''"
                class="flex flex-col items-center justify-center w-full bg-center bg-no-repeat bg-contain border-dashed rounded-lg cursor-pointer aspect-square bg-yellow-50">
                <input type="file" class="hidden" @change="handleImageUpload" />
                <div class="" v-if="!url">
                  <span class="text-yellow-500">Upload Image</span>
                </div>
              </label>
            </div>
            <div class="">
              <div class="">
                <label for="name" class="font-semibold">Product Name</label>
                <input v-model="productName" type="text" class="w-full rounded-md" />
              </div>
              <div class="">
                <label for="name" class="font-semibold">Product Price</label>
                <input v-model="price" type="number" class="w-full rounded-md" />
              </div>
              <div class="">
                <label for="name" class="font-semibold">Product Category</label>
                <select v-model="category" name="" class="block w-full rounded-md" id="">
                  <option :value="category.id" v-for="category in categoryStore.categories" :key="category.id"
                    class="font-medium">
                    {{ category.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="flex justify-end gap-2 p-4">
            <button @click="setIsOpen(false)" class="px-4 py-2 bg-yellow-300 font-medium rounded">Cancel</button>
            <input type="submit" class="px-4 py-2 bg-yellow-300 font-medium rounded" value="Submit" />
          </div>
        </form>
      </DialogPanel>
    </div>
  </Dialog>
</template>
