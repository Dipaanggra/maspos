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
        <nav class="flex justify-between bg-yellow-500 p-5 px-36 text-white relative">
            <h1 class="text-l font-bold">MASPOS</h1>
            <div class="flex items-center justify-end gap-2 relative">
                <div @click="toggleDropdown" class="cursor-pointer flex items-center gap-2">
                    <div>Taufik00</div>
                    <img src="https://source.unsplash.com/random/?person" class="size-8 rounded-full object-cover"
                        alt="Profile" />
                </div>
                <div v-if="showDropdown" class="absolute right-0 mt-12 w-48 bg-white rounded-md shadow-lg z-10">
                    <button @click="logout"
                        class="block w-full text-left px-4 py-2 rounded-md text-sm text-yellow-500 font-medium hover:bg-gray-50">
                        Logout
                    </button>
                </div>
            </div>
        </nav>
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
                                    <div class="mr-6 font-bold text-black">Rp. {{ item.price.toLocaleString() }}</div>
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
                            <td class="p-2 justify-evenly flex">
                                <button @click="removeItem(item.id)"
                                    class="rounded bg-red-500 px-2 py-2 hover:bg-red-600 font-normal text-white">Remove
                                    Item</button>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr class="justify-between flex">
                            <td class="p-2 text-right font-bold" colspan="2">Total</td>
                            <td class="p-2 font-bold">Rp. {{ cartStore.totalBill.toLocaleString() }}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div class="mt-6 flex justify-end gap-4">
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
