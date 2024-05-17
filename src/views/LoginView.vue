<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from "vue-router";

const router = useRouter();
const form = ref({
    email: 'admin@example.com',
    password: 'secret',
});

const submit = async () => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/login`, form.value);
        localStorage.setItem('auth', response.data.data.token);
        router.push('/products');
    } catch (error) {
        console.error('Failed to login:', error);
        alert('Invalid credentials');
    }
};
</script>

<template>
    <div>
        <div class="flex justify-between bg-blue-600 p-7 px-36 text-white">
            <h1 class="text-l font-bold">MASPOS</h1>
            <div class="items-center justify-end">
                <div class="text-sm">Call Us +62 817-1902-092</div>
            </div>
        </div>
        <div class="flex min-h-full flex-col justify-center px-6 py-8 lg:px-8">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>
            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form class="space-y-6" @submit.prevent="submit">
                    <div>
                        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email
                            address</label>
                        <div class="mt-2">
                            <input v-model="form.email" id="email" name="email" type="email" autocomplete="email"
                                required
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        </div>
                    </div>
                    <div>
                        <div class="flex items-center justify-between">
                            <label for="password"
                                class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        </div>
                        <div class="mt-2">
                            <input v-model="form.password" id="password" name="password" type="password"
                                autocomplete="current-password" required
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        </div>
                    </div>
                    <div>
                        <button type="submit"
                            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
