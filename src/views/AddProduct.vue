<script setup>
// import { ref } from 'vue'
import {
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/vue'

// const isOpen = ref(false)

// function setIsOpen(value) {
//     isOpen.value = value
// }
</script>
<script>
import axios from 'axios';

export default {
    components: {
        DialogPanel,
        DialogTitle,
    },
    data() {
        return {
            isOpen: false,
            productName: '',
            price: '',
            category: '',
            image: null,
            categories: null,
            url: ''
        }
    },
    async mounted() {
        this.categories = await this.fetchCategories()
    },
    methods: {
        setIsOpen(value) {
            this.isOpen = value
        },
        async fetchCategories() {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/category`, {
                headers: {
                    Authorization: localStorage.getItem('auth')
                }
            });
            return response.data.data;
        },
        async addProduct() {
            const formData = new FormData();
            formData.append('name', this.productName);
            formData.append('price', this.price);
            formData.append('category_id', this.category);
            formData.append('image', this.image);

            try {
                await axios.post(`${import.meta.env.VITE_BASE_URL}/product`, formData, {
                    headers: {
                        Authorization: localStorage.getItem('auth'),
                        'Content-Type': 'multipart/form-data'
                    }
                });
                this.setIsOpen(false)
                this.productName = ''
                this.price = ''
                this.category = ''
                this.image = null
                this.url = null
                this.$emit('productAdded')
            } catch (error) {
                console.error('Failed to add product:', error);
                this.setIsOpen(false)
            }


        },
        handleImageUpload(event) {
            this.image = event.target.files[0];
            this.url = URL.createObjectURL(this.image);
        }
    }
}
</script>
<style></style>
<template>
    <button @click="setIsOpen(true)"
        class="rounded bg-blue-200 px-4 py-2 text-sm font-semibold hover:bg-blue-300 text-blue-800">+ Add
        Product</button>
    <Dialog :open="isOpen" @close="setIsOpen" class="relative z-50">
        <!-- The backdrop, rendered as a fixed sibling to the panel container -->
        <div class="fixed inset-0 bg-black/30" aria-hidden="true" />

        <!-- Full-screen container to center the panel -->
        <div class="fixed inset-0 flex w-screen items-center justify-center p-4">
            <!-- The actual dialog panel -->
            <DialogPanel class="w-full max-w-xl rounded bg-white">
                <DialogTitle class="flex justify-between p-4 border-b">
                    <div class="text-xl font-bold">Complete your order</div>
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
                    <div class="grid md:grid-cols-2 gap-3 p-4">
                        <div class="">
                            <label :style="{ 'background-image': `url(${url})` }" :class="!url ? ' border-2' : ''"
                                class="flex flex-col items-center justify-center bg-contain bg-no-repeat bg-center border-dashed rounded-lg w-full aspect-square cursor-pointer bg-blue-50">
                                <input type="file" class="hidden" @change="handleImageUpload" />
                                <div class="" v-if="!url">
                                    <span class="text-blue-500">Upload Image</span>
                                </div>
                            </label>
                        </div>
                        <div class="">
                            <div class="">
                                <label for="name">Name</label>
                                <input v-model="productName" type="text" class="w-full">
                            </div>
                            <div class="">
                                <label for="name">Price</label>
                                <input v-model="price" type="number" class="w-full">
                            </div>
                            <div class="">
                                <label for="name">Category</label>
                                <select v-model="category" name="" class="block w-full" id="">
                                    <option :value="category.id" v-for="category in categories" :key="category.id">
                                        {{ category.name }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="flex gap-2 justify-end p-4">
                        <button class="px-4 py-2 rounded bg-blue-300">Cancel</button>
                        <input type="submit" class="px-4 py-2 rounded bg-blue-300" value="Submit">
                    </div>
                </form>

                <!-- ... -->
            </DialogPanel>
        </div>
    </Dialog>
</template>