<script setup>
import { ref, onMounted } from 'vue';
import { cartStore } from '../stores/cartStore';
import { useRouter } from 'vue-router';

const paymentSuccessful = ref(false);
const showPopup = ref(false);
const showDropdown = ref(false);

const removeItem = (productId) => {
    cartStore.removeItem(productId);
};

const incrementQuantity = (productId) => {
    cartStore.incrementQuantity(productId);
};

const decrementQuantity = (productId) => {
    cartStore.decrementQuantity(productId);
};

const payBill = () => {
    paymentSuccessful.value = true;
    showPopup.value = true;
    cartStore.clearCart();
};

const closePopup = () => {
    showPopup.value = false;
    paymentSuccessful.value = false;
};

const toggleDropdown = () => {
    showDropdown.value = !showDropdown.value;
};

const logout = () => {
    localStorage.removeItem('auth');
    window.location.href = '/login';
};

const router = useRouter();
const backToHome = () => {
    router.push('/products');
};

onMounted(() => {
    // Any necessary initialization
});
</script>

<template>
    <div class="flex min-h-screen flex-col">
        <div class="sticky top-0">
            <nav class="relative flex justify-between p-5 text-white bg-yellow-500 px-36">
                <img src="/public/e-shop.png" class="items-start h-8" alt="">
                <div class="relative flex items-center justify-end gap-2">
                    <div class="relative" @click="toggleDropdown">
                        <div class="flex items-center cursor-pointer">
                            <div>Taufik00</div>
                            <img src="https://i.pravatar.cc/300" class="object-cover ml-2 rounded-full size-8"
                                alt="Profile" />
                        </div>
                        <div v-if="showDropdown" class="absolute right-0 z-10 w-48 mt-2 bg-white rounded-md shadow-lg">
                            <button @click="logout"
                                class="block w-full px-4 py-2 text-sm font-medium text-left text-yellow-500 rounded-md hover:bg-gray-50">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
        <div class="bg-white p-10 px-36">
            <div class="overflow-x-auto">
                <table class="min-w-full">
                    <thead>
                        <tr class="bg-white">
                            <th class="p-2 text-left">Product</th>
                            <th class="p-2 text-left">Qty</th>
                            <th class="p-2 text-left">Sub Total</th>
                            <th class="p-2 text-left"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in cartStore.items" :key="item.id">
                            <td class="flex items-center p-2">
                                <img :src="item.picture_url" class="mr-4 h-28 w-28 rounded-lg object-cover" />
                                <div>
                                    <div class="font-bold">{{ item.name }}</div>
                                    <div class="mr-6 font-bold text-black">Rp. {{ item.price.toLocaleString() }}
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div class="flex items-center gap-3">
                                    <button @click="decrementQuantity(item.id)"
                                        class="rounded-full bg-yellow-500 px-3 py-1 font-medium text-white hover:bg-yellow-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-3" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M20 12H4" />
                                        </svg>
                                    </button>
                                    <input class="mx-2 w-12 text-center font-bold border-yellow-500 rounded-lg"
                                        :value="item.quantity" type="text" readonly />
                                    <button @click="incrementQuantity(item.id)"
                                        class="rounded-full bg-yellow-500 px-3 py-1 font-medium text-white hover:bg-yellow-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-3" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M12 6v12m0-6h6m-6 0H6" />
                                        </svg>
                                    </button>
                                </div>
                            </td>
                            <td class="p-2 font-bold">Rp. {{ (item.price * item.quantity).toLocaleString() }}</td>
                            <td>
                                <button @click="removeItem(item.id)"
                                    class="rounded bg-red-500 px-2 py-2 hover:bg-red-600 font-normal text-white">Remove
                                    Item</button>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot class="px-10">
                        <tr class="justify-between flex ">
                            <td class="p-2 text-right font-bold" colspan="2">Total</td>
                            <td class="p-2 font-bold">Rp. {{ cartStore.totalBill.toLocaleString() }}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
        <div class="sticky bottom-0 px-36 bg-white py-4">
            <div class="flex justify-end gap-4">
                <button @click="backToHome"
                    class="rounded border-2 border-yellow-500 px-4 py-2 font-semibold text-yellow-600">Back to
                    Home</button>
                <button @click="payBill"
                    class="rounded bg-yellow-500 hover:bg-yellow-600 px-4 py-2 font-semibold text-white">Pay
                    Bill</button>
            </div>
        </div>
        <div v-if="showPopup" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div class="bg-white p-8 rounded-lg shadow-lg text-center">
                <div class="text-2xl font-bold">Payment Successful</div>
                <div class="my-4 text-xl">Rp. {{ cartStore.totalBill.toLocaleString() }}</div>
                <div>
                    <button @click="backToHome"
                        class="mt-4 rounded bg-yellow-500 px-4 py-2 font-semibold text-white">Back
                        to Home</button>
                </div>
            </div>
        </div>
    </div>
</template>
