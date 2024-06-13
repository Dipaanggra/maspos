<script setup>
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
            categoryName: ''
        }
    },
    methods: {
        setIsOpen(value) {
            this.isOpen = value
        },
        async addCategory() {
            const formData = new FormData()
            formData.append('name', this.categoryName)

            try {
                await axios.post(`${import.meta.env.VITE_BASE_URL}/category`, formData, {
                    headers: {
                        Authorization: localStorage.getItem('auth')
                    }
                })
                this.setIsOpen(false)
                this.categoryName = ''
                this.$emit('categoryAdded')
            } catch (error) {
                console.error('Failed to add category:', error)
                this.setIsOpen(false)
            }
        }
    }
}
</script>
<style></style>
<template>
    <button @click="setIsOpen(true)"
        class="px-4 py-2 text-sm font-semibold text-blue-800 bg-blue-200 rounded hover:bg-blue-300">
        + Add Category
    </button>
    <Dialog :open="isOpen" @close="setIsOpen" class="relative z-50">
        <!-- The backdrop, rendered as a fixed sibling to the panel container -->
        <div class="fixed inset-0 bg-black/30" aria-hidden="true" />

        <!-- Full-screen container to center the panel -->
        <div class="fixed inset-0 flex items-center justify-center w-screen p-4">
            <!-- The actual dialog panel -->
            <DialogPanel class="w-full max-w-xl bg-white rounded">
                <DialogTitle class="flex justify-between p-4 border-b">
                    <div class="text-xl font-bold">Add Category</div>
                    <button @click="setIsOpen(false)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-x">
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                        </svg>
                    </button>
                </DialogTitle>
                <form v-on:submit.prevent="addCategory">
                    <div class="grid gap-3 p-4 md:grid-cols-2">
                        <div class="">
                            <label for="name">Name</label>
                            <input v-model="categoryName" type="text" class="w-full" />
                        </div>
                    </div>
                    <div class="flex justify-end gap-2 p-4">
                        <button class="px-4 py-2 bg-blue-300 rounded">Cancel</button>
                        <button type="submit" class="px-4 py-2 bg-blue-300 rounded">Submit</button>
                    </div>
                </form>

                <!-- ... -->
            </DialogPanel>
        </div>
    </Dialog>
</template>
