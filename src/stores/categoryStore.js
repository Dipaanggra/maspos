import axios from "axios"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useCategoryStore = defineStore('category', () => {
    const categories = ref(null)
    async function fetchCategories() {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/category`, {
            headers: {
                Authorization: localStorage.getItem('auth')
            }
        })
        categories.value = response.data.data
    }

    return { categories, fetchCategories }

})