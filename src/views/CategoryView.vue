<script>
import axios from 'axios';
import EditCategory from './EditCategory.vue';

export default {
  components: {
    EditCategory
  },
  data() {
    return {
      categories: [],
      showDropdown: false,
      showEditModal: false,
      categoryToEdit: null
    }
  },
  async mounted() {
    this.categories = await this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/category`, {
          headers: {
            Authorization: localStorage.getItem('auth')
          }
        });
        return response.data.data;
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        return [];
      }
    },
    async deleteCategory(categoryId) {
      try {
        await axios.delete(`${import.meta.env.VITE_BASE_URL}/category/${categoryId}`, {
          headers: {
            Authorization: localStorage.getItem('auth')
          }
        });
        this.categories = this.categories.filter(category => category.id !== categoryId);
      } catch (error) {
        console.error('Failed to delete the category:', error);
      }
    },
    editCategory(category) {
      this.categoryToEdit = { ...category };
      this.showEditModal = true;
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    logout() {
      localStorage.removeItem('auth');
      this.$router.push('/login');
    },
    updateCategory(updatedCategory) {
      const index = this.categories.findIndex(category => category.id === updatedCategory.id);
      if (index !== -1) {
        this.categories.splice(index, 1, updatedCategory);
      }
      this.showEditModal = false;
    }
  }
}
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <div class="sticky top-0">
      <nav class="relative flex justify-between p-5 text-white bg-yellow-500 px-36">
        <img src="/public/e-shop.png" class="items-start h-8" alt="">
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
    </div>
    <div class="bg-white p-10 px-36">
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
              <td class="flex items-center p-3">
                <div>
                  <div class="font-semibold">{{ category.name }}</div>
                </div>
              </td>
              <td>
                <div class="flex items-center gap-3">
                  <button @click="deleteCategory(category.id)"
                    class="rounded-md bg-red-500 px-4 py-2 font-normal text-white hover:bg-red-600">
                    Delete Category
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
