<script>
export default {
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
};
</script>
<template>
  <div class="flex space-x-2 my-4 justify-center border-b-2 ">
    <button v-for="category in categories" :key="category.id" @click="$emit('filter', category.id)"
      class="px-4 py-2 text-sm font-medium text-gray-800 hover:text-yellow-400">
      {{ category.name }}
    </button>
  </div>
</template>
