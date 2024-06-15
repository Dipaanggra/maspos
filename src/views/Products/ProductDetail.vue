<script>
import { ref } from 'vue'
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/vue'
export default {
    components: {
        TransitionRoot,
        TransitionChild,
        Dialog,
        DialogPanel,
        DialogTitle,
    },
    props: {
        product: {
            type: Object,
            required: true
        },
        isOpen: { type: Boolean },
    },
    methods: {
        close() {
            this.$emit('update:isOpen', false);
        },
    }
}
</script>

<template>
    <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" @close="close" class="relative z-10">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black/25" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                                Details Product
                            </DialogTitle>
                            <img :src="product.picture_url" alt="Product Image" class="w-full mb-4 rounded mt-4">
                            <div class="flex justify-between">
                                <h3 class="text-xl font-bold mb-1">{{ product.name }}</h3>
                                <span
                                    class="inline-block bg-blue-500 text-white rounded-full px-3 py-1 text-sm font-semibold">Makanan</span>
                            </div>
                            <p class="text-gray-700 font-semibold text-l mb-2">Rp.{{ product.price.toLocaleString() }}
                            </p>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>