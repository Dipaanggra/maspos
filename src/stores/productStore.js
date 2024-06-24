import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useProductStore = defineStore('product', () => {
  const post = ref(null)
  const posts = ref(null)
  const filteredProducts = ref(null)

  async function fetchProducts() {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/product`, {
      headers: {
        Authorization: localStorage.getItem('auth')
      }
    });
    posts.value = response.data.data
    filteredProducts.value = posts.value
  }

  async function detailsProduct(productId) {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/product/${productId}`, {
      headers: {
        Authorization: localStorage.getItem('auth')
      }
    });
    post.value = response.data.data
  }

  async function deleteProduct(productId) {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/product/${productId}`, {
        headers: {
          Authorization: localStorage.getItem('auth')
        }
      })
      posts.value = posts.value.filter((post) => post.id !== productId)
      filteredProducts.value = filteredProducts.value.filter((post) => post.id !== productId)
    } catch (error) {
      console.error('Failed to delete the product:', error)
    }
  }

  function filterProducts(category) {
    if (category === 'Semua') {
      filteredProducts.value = posts.value
    } else {
      console.log(category)
      filteredProducts.value = posts.value.filter(product => product.category_id === category)
    }
  }

  return { post, posts, filteredProducts, fetchProducts, detailsProduct, deleteProduct, filterProducts }
})
