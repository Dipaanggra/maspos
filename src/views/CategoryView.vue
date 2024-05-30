<script>
import axios from 'axios'
export default {
  data() {
    return {
      categories: null
    }
  },
  async mounted() {
    this.categories = await this.fetchCategories()
  },
  methods: {
    async fetchCategories() {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/category`, {
        headers: {
          Authorization: localStorage.getItem('auth')
        }
      })
      return response.data.data
    }
  }
}
</script>
<template>
  <div class="flex flex-col min-h-screen">
    <nav class="relative flex justify-between p-5 text-white bg-blue-600 px-36">
      <h1 class="font-bold text-l">MASPOS</h1>
      <div class="relative flex items-center justify-end gap-2">
        <div @click="toggleDropdown" class="flex items-center gap-2 cursor-pointer">
          <div>Taufik00</div>
          <img
            src="https://source.unsplash.com/random/?person"
            class="object-cover rounded-full size-8"
            alt="Profile"
          />
        </div>
        <div
          v-if="showDropdown"
          class="absolute right-0 z-10 w-48 mt-12 bg-white rounded-md shadow-lg"
        >
          <button
            @click="logout"
            class="block w-full px-4 py-2 text-sm font-medium text-left text-blue-500 rounded-md hover:bg-gray-50"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
    <div class="p-10 bg-white px-36">
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead>
            <tr class="bg-white">
              <th class="p-2 text-left">Category Name</th>
              <th class="p-2 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="category in categories" :key="category.id">
              <td class="flex items-center p-2">
                <div>
                  <div class="font-semibold">{{ category.name }}</div>
                </div>
              </td>
              <td>
                <div class="flex items-center gap-3">
                  <button
                    class="px-4 py-2 font-normal text-white bg-red-500 rounded-md hover:bg-red-600"
                  >
                    Delete Category
                  </button>
                  <button
                    class="px-4 py-2 font-normal text-white bg-green-500 rounded-md hover:bg-green-600"
                  >
                    Edit Category
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
