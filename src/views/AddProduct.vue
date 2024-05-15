<script>
import axios from 'axios';

export default {
    data() {
        return {
            productName: '',
            price: '',
            category: '',
            image: null
        }
    },
    methods: {
        async addProduct() {
            const formData = new FormData();
            formData.append('name', this.productName);
            formData.append('price', this.price);
            formData.append('category', this.category);
            formData.append('image', this.image);

            try {
                await axios.post(`${import.meta.env.VITE_BASE_URL}/product`, formData, {
                    headers: {
                        Authorization: localStorage.getItem('auth'),
                        'Content-Type': 'multipart/form-data'
                    }
                });
                this.$emit('productAdded');
                this.$emit('close');
            } catch (error) {
                console.error('Failed to add product:', error);
            }
        },
        handleImageUpload(event) {
            this.image = event.target.files[0];
        }
    }
}
</script>

<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white rounded-lg shadow-lg p-6 w-3/4 md:w-1/2 lg:w-1/3 relative">
            <button class="text-gray-500 hover:text-gray-900 absolute top-4 right-4" @click="$emit('close')">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <h2 class="text-2xl font-bold mb-4">Add Product</h2>
            <div class="flex flex-col gap-4">
                <label
                    class="flex flex-col items-center justify-center border-2 border-dashed rounded-lg h-48 cursor-pointer bg-blue-50">
                    <input type="file" class="hidden" @change="handleImageUpload" />
                    <span class="text-blue-500">Upload Image</span>
                </label>
                <input type="text" v-model="productName" placeholder="Product Name" class="border rounded px-4 py-2" />
                <input type="text" v-model="price" placeholder="Input price" class="border rounded px-4 py-2" />
                <select v-model="category" class="border rounded px-4 py-2">
                    <option value="" disabled>Select category</option>
                    <option value="Makanan">Makanan</option>
                    <option value="Minuman">Minuman</option>
                    <option value="Lainnya">Lainnya</option>
                </select>
                <div class="flex justify-end gap-4 mt-4">
                    <button @click="$emit('close')" class="rounded bg-gray-200 px-4 py-2">Cancel</button>
                    <button @click="addProduct" class="rounded bg-blue-500 px-4 py-2 text-white">Confirm</button>
                </div>
            </div>
        </div>
    </div>
</template>
