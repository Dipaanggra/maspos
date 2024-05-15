<script>
import { cartStore } from '../stores/cartStore';

export default {
    data() {
        return {};
    },
    methods: {
        removeItem(productId) {
            cartStore.removeItem(productId);
        },
        incrementQuantity(productId) {
            cartStore.incrementQuantity(productId);
        },
        decrementQuantity(productId) {
            cartStore.decrementQuantity(productId);
        },
        payBill() {
            // Handle the payment process
            alert('Payment Successful!');
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
    <div class="bg-white p-10">
        <h1 class="text-2xl font-bold mb-6">Checkout</h1>
        <div class="overflow-x-auto">
            <table class="min-w-full border-collapse">
                <thead>
                    <tr class="bg-gray-100">
                        <th class="border p-2 text-left">Product</th>
                        <th class="border p-2 text-left">Qty</th>
                        <th class="border p-2 text-left">Sub Total</th>
                        <th class="border p-2"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item) in cartItems" :key="item.id">
                        <td class="border p-2 flex items-center">
                            <img :src="item.picture_url" class="w-16 h-16 object-cover mr-4" />
                            <div>
                                <div class="font-semibold">{{ item.name }}</div>
                                <div class="text-gray-500">Rp. {{ item.price.toLocaleString() }}</div>
                            </div>
                        </td>
                        <td class="border p-2 flex items-center justify-center">
                            <button @click="decrementQuantity(item.id)" class="px-2">-</button>
                            <input type="text" :value="item.quantity" class="w-12 text-center border mx-2" readonly />
                            <button @click="incrementQuantity(item.id)" class="px-2">+</button>
                        </td>
                        <td class="border p-2">Rp. {{ (item.price * item.quantity).toLocaleString() }}</td>
                        <td class="border p-2">
                            <button @click="removeItem(item.id)" class="text-red-500">Remove Item</button>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td class="border p-2 text-right font-bold" colspan="2">Total</td>
                        <td class="border p-2 font-bold">Rp. {{ totalBill.toLocaleString() }}</td>
                        <td class="border p-2"></td>
                    </tr>
                </tfoot>
            </table>
        </div>
        <div class="mt-6 flex justify-end gap-4">
            <button @click="$router.push('/')" class="bg-gray-200 px-4 py-2">Back to Home</button>
            <button @click="payBill" class="bg-blue-500 text-white px-4 py-2">Pay Bill</button>
        </div>
    </div>
</template>
