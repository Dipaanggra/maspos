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
    <nav class="flex justify-between bg-yellow-500 p-5 px-36 text-white relative">
      <h1 class="text-l font-bold">MASPOS</h1>
      <div class="flex items-center justify-end gap-2 relative">
        <div @click="toggleDropdown" class="cursor-pointer flex items-center gap-2">
          <div>Taufik00</div>
          <img src="https://source.unsplash.com/random/?person" class="w-8 h-8 rounded-full object-cover"
            alt="Profile" />
        </div>
        <div v-if="showDropdown" class="absolute right-0 mt-12 w-48 bg-white rounded-md shadow-lg z-10">
          <button @click="logout"
            class="block w-full text-left px-4 py-2 rounded-md text-sm text-yellow-500 font-medium hover:bg-gray-50">
            Logout
          </button>
        </div>
      </div>
    </nav>
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
                  <button @click="editCategory(category)"
                    class="rounded-md bg-yellow-500 px-4 py-2 font-normal text-white hover:bg-yellow-600">
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
