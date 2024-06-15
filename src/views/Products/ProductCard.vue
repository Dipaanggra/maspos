<script>
export default {
    name: 'ProductCard',
    props: {
        post: {
            type: Object,
            required: true,
        },
    }
};
</script>
<template>
    <div class="overflow-hidden rounded-lg shadow">
        <img :src="post.picture_url" class="aspect-[200/165] object-cover" @click="$emit('detailProducts', post)" />
        <div class="p-3">
            <div class="flex items-center justify-between">
                <div class="text-sm font-medium">{{ post.name }}</div>
                <button @click="$emit('deleteProduct', post.id)"
                    class="px-2 py-1 text-xs text-white bg-red-500 rounded">
                    Delete
                </button>
            </div>
            <div class="text-sm font-bold">Rp.{{ post.price.toLocaleString() }}</div>
            <div class="flex justify-center mt-5">
                <button @click="$emit('addToCart', post)"
                    class="w-full px-4 py-2 text-sm text-white bg-yellow-400 rounded hover:bg-yellow-500 sm:max-w-32">
                    + Add to Cart
                </button>
            </div>
        </div>
    </div>
</template>
