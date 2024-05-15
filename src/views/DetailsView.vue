<script>
export default {
    props: {
        product: {
            type: Object,
            required: true
        }
    }
}
</script>

<template>
    <div v-if="product" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white rounded-lg shadow-lg p-6 w-3/4 md:w-1/2 lg:w-1/3 relative">
            <button class="text-white hover:bg-blue-600 absolute top-4 right-4 bg-blue-500 p-1 rounded-full"
                @click="$emit('close')">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <h2 class="text-2xl font-bold mb-4">Details Product</h2>
            <img :src="product.picture_url" alt="Product Image" class="w-full mb-4 rounded">
            <div class="flex justify-between">
                <h3 class="text-xl font-bold mb-1">{{ product.name }}</h3>
                <span
                    class="inline-block bg-blue-500 text-white rounded-full px-3 py-1 text-sm font-semibold">Makanan</span>
            </div>
            <p class="text-gray-700 font-semibold text-l mb-2">Rp.{{ product.price }}</p>
        </div>
    </div>
</template>
