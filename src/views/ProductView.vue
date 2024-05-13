<script>
import axios from 'axios';

export default {
    data() {
        return {
            posts: null,
        }
    },
    async mounted() {
        this.posts = await axios.get(`${import.meta.env.VITE_BASE_URL}/product`, {
            headers: {
                Authorization: localStorage.getItem('auth')
            }
        }).then(function (response) {
            return response['data']['data']
        })
    }
}
</script>
<template>

    <div class="bg-white">
        <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 class="sr-only">Products</h2>


            <div class="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-5  xl:gap-x-8">

                <div v-for="post in posts" :key="post.id" class="overflow-hidden rounded-lg shadow">
                    <img :src="post['picture_url']" class="aspect-[200/165] object-cover" />
                    <div class="p-3">
                        <div class="flex items-center justify-between">
                            <div class="text-sm">{{ post['name'] }}</div>
                            <button class="rounded bg-red-600 px-2 py-1 text-xs text-white">Delete</button>
                        </div>
                        <div class="text-sm font-bold">Rp.{{ post['price'] }}</div>
                        <div class="mt-5 flex justify-center">
                            <button class="w-full  rounded bg-blue-500 px-4 py-2 text-sm text-white sm:max-w-32">+
                                Add to Cart</button>
                        </div>
                    </div>
                </div>

                <!-- <pre>{{ posts }}</pre> -->

            </div>


        </div>
    </div>

</template>