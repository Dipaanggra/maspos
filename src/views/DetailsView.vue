<script>

import axios from 'axios';

export default {
    data() {
        return {
            selectedProduct: null,
        }
    },
    async mounted() {
        this.post = await this.fetchProduct();
    },
    methods: {
        async detailsProduct(productId) {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/product/${productId}`, {
                headers: {
                    Authorization: localStorage.getItem('auth')
                }
            });
            this.selectedProduct = response.data.data;
        }
    }
}
</script>

<template>
    <div class="mt-4">dipaa</div>
</template>
