<script>
import axios from 'axios';
import DetailsView from './DetailsView.vue';
import AddProduct from './AddProduct.vue';
import { cartStore } from '../stores/cartStore';
import AddCategory from './AddCategory.vue';

export default {
    components: {
        DetailsView,
        AddProduct,
        AddCategory
    },
    data() {
        return {
            posts: null,
            selectedProduct: null,
            showModal: false,
            showAddProductModal: false,
            showAddCategoryModal: false,
            showDropdown: false
        }
    },
    async mounted() {
        this.posts = await this.fetchProducts();
    },
    methods: {
        async fetchProducts() {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/product`, {
                headers: {
                    Authorization: localStorage.getItem('auth')
                }
            });
            return response.data.data;
        },
        async detailsProduct(productId) {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/product/${productId}`, {
                headers: {
                    Authorization: localStorage.getItem('auth')
                }
            });
            this.selectedProduct = response.data.data;
            this.showModal = true;
        },
        async deleteProduct(productId) {
            try {
                await axios.delete(`${import.meta.env.VITE_BASE_URL}/product/${productId}`, {
                    headers: {
                        Authorization: localStorage.getItem('auth')
                    }
                });
                this.posts = this.posts.filter(post => post.id !== productId);
            } catch (error) {
                console.error('Failed to delete the product:', error);
            }
        },
        closeModal() {
            this.showModal = false;
            this.selectedProduct = null;
        },
        closeAddProductModal() {
            this.showAddProductModal = false;
        },
        async productAdded() {
            this.posts = await this.fetchProducts();
        },
        closeAddCategoryModal() {
            this.showAddCategoryModal = false;
        },
        async categoryAdded() {
            this.posts = await this.fetchProducts();
        },
        addToCart(product) {
            cartStore.addItem(product);
        },
        toggleDropdown() {
            this.showDropdown = !this.showDropdown;
        },
        logout() {
            localStorage.removeItem('auth');
            this.$router.push('/login');
        }
    },
    computed: {
        cartItems() {
            return cartStore.items;
        },
        totalBill() {
            return cartStore.totalBill;
        }
    }
}
</script>


<template>
    <div class="bg-white">
        <nav class="flex justify-between bg-blue-600 p-5 px-36 text-white relative">
            <h1 class="text-l font-bold">MASPOS</h1>
            <div class="flex items-center justify-end gap-2 relative">
                <div class="relative" @click="toggleDropdown">
                    <div class="cursor-pointer flex items-center">
                        <div>Taufik00</div>
                        <img src="https://source.unsplash.com/random/?person"
                            class="size-8 rounded-full object-cover ml-2" alt="Profile" />
                    </div>
                    <div v-if="showDropdown" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                        <button @click="logout"
                            class="block w-full text-left px-4 py-2 rounded-md text-sm text-blue-500 font-medium hover:bg-gray-50">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
        <main>
            <div class="flex items-center justify-end gap-3 px-36 pt-10">
                <button class="rounded bg-blue-200 px-4 py-2 text-sm font-semibold hover:bg-blue-300 text-blue-800"
                    @click="showAddCategoryModal = true">+ Add
                    Category</button>
                <button @click="showAddProductModal = true"
                    class="rounded bg-blue-200 px-4 py-2 text-sm font-semibold hover:bg-blue-300 text-blue-800">+ Add
                    Product</button>
                <button class="rounded bg-blue-500 hover:bg-blue-600 px-4 py-2 text-sm font-semibold text-blue-100"
                    @click="$router.push('/checkout')">Cart</button>
            </div>

            <div class="my-4 flex px-36">
                <button class="border-b-2 border-blue-500 py-1 font-medium text-blue-600">Category 1</button>
                <div class="w-4 border-b-2"></div>
                <button class="border-b-2 py-1 font-medium">Category 2</button>
                <div class="w-4 border-b-2"></div>
                <button class="border-b-2 py-1 font-medium">Category 3</button>
                <div class="flex-1 border-b-2"></div>
            </div>
            <div class="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
                <div class="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-5 xl:gap-x-8">
                    <div v-for="post in posts" :key="post.id" class="overflow-hidden rounded-lg shadow">
                        <img :src="post.picture_url" class="aspect-[200/165] object-cover"
                            @click="detailsProduct(post.id)" />
                        <div class="p-3">
                            <div class="flex items-center justify-between">
                                <div class="text-sm font-medium">{{ post.name }}</div>
                                <button @click="deleteProduct(post.id)"
                                    class="rounded bg-red-600 px-2 py-1 text-xs text-white">Delete</button>
                            </div>
                            <div class="text-sm font-bold">Rp.{{ post.price.toLocaleString() }}</div>
                            <div class="mt-5 flex justify-center">
                                <button @click="addToCart(post)"
                                    class="w-full rounded bg-blue-500 hover:bg-blue-600 px-4 py-2 text-sm text-white sm:max-w-32">+
                                    Add to
                                    Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex justify-end mt-10">
                    <button class="rounded bg-blue-500 hover:bg-blue-600 px-4 py-2 font-medium text-white"
                        @click="$router.push('/checkout')">Total Bill : Rp.{{ totalBill.toLocaleString() }}</button>
                </div>
            </div>
        </main>
        <DetailsView v-if="showModal" :product="selectedProduct" @close="closeModal"></DetailsView>
        <AddProduct v-if="showAddProductModal" @close="closeAddProductModal" @productAdded="productAdded"></AddProduct>
        <AddCategory v-if="showAddCategoryModal" @close="closeAddCategoryModal" @categoryAdded="categoryAdded">
        </AddCategory>
    </div>
</template>
