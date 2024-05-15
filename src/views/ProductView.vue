<script>
import axios from 'axios';
// import import { useRouter } from "vue-router";

export default {
    data() {
        return {
            posts: null,
            selectedProduct: null,
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
        },
        async deleteProduct(productId) {
            try {
                await axios.delete(`${import.meta.env.VITE_BASE_URL}/product/${productId}`, {
                    headers: {
                        Authorization: localStorage.getItem('auth')
                    }
                });
                // Remove the deleted product from the posts array
                this.posts = this.posts.filter(post => post.id !== productId);
            } catch (error) {
                console.error('Failed to delete the product:', error);
            }
        }
    }
}
</script>
<template>

    <div class="bg-white">
        <nav class="flex justify-between bg-blue-600 p-5 px-36 text-white">
            <h1 class="text-l font-bold">MASPOS</h1>
            <div class="flex items-center justify-end gap-2">
                <div class="">John doe</div>
                <img src="https://source.unsplash.com/random/?person" class="size-8 rounded-full object-cover"
                    alt="Profile" />
            </div>
        </nav>
        <main>
            <div class="flex items-center justify-end gap-3 px-36 pt-10">
                <button class="rounded bg-blue-200 px-4 py-2 text-sm font-semibold text-blue-800">+ Add
                    Category</button>
                <button class="rounded bg-blue-200 px-4 py-2 text-sm font-semibold text-blue-800">+ Add
                    Products</button>
                <button class="rounded bg-blue-700 px-4 py-2 text-sm font-semibold text-blue-100">Cart</button>
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
                <div class="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-5  xl:gap-x-8">

                    <div v-for="post in posts" :key="post.id" class="overflow-hidden rounded-lg shadow">
                        <img :src="post['picture_url']" class="aspect-[200/165] object-cover"
                            @click="detailsProduct(post.id)" />
                        <div class="p-3">
                            <div class="flex items-center justify-between">
                                <div class="text-sm">{{ post['name'] }}</div>
                                <button @click="deleteProduct(post.id)"
                                    class="rounded bg-red-600 px-2 py-1 text-xs text-white">Delete</button>
                            </div>
                            <div class="text-sm font-bold">Rp.{{ post['price'] }}</div>
                            <div class="mt-5 flex justify-center">
                                <button class="w-full  rounded bg-blue-500 px-4 py-2 text-sm text-white sm:max-w-32">+
                                    Add to Cart</button>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="flex justify-end mt-10">
                    <button class="rounded bg-blue-500 px-4 py-3 font-medium text-white">Total Bill : Rp.</button>
                </div>

            </div>
        </main>
    </div>
    <!-- Example modal for product details
    <div v-if="selectedProduct" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-5 rounded">
            <h2 class="text-xl font-bold mb-4">Product Details</h2>
            <p><strong>Name:</strong> {{ selectedProduct.name }}</p>
            <p><strong>Price:</strong> Rp.{{ selectedProduct.price }}</p>
            <p><strong>Description:</strong> {{ selectedProduct.description }}</p>
            <button @click="selectedProduct = null" class="mt-4 rounded bg-red-600 px-4 py-2 text-white">Close</button>
        </div>
    </div> -->

</template>