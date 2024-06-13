<script>
export default {
  data() {
    method: {
      await fetchCategories() {

      }
    }
  }
}
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <nav class="flex justify-between bg-blue-600 p-5 px-36 text-white relative">
      <h1 class="text-l font-bold">MASPOS</h1>
      <div class="flex items-center justify-end gap-2 relative">
        <div @click="toggleDropdown" class="cursor-pointer flex items-center gap-2">
          <div>Taufik00</div>
          <img src="https://source.unsplash.com/random/?person" class="size-8 rounded-full object-cover"
            alt="Profile" />
        </div>
        <div v-if="showDropdown" class="absolute right-0 mt-12 w-48 bg-white rounded-md shadow-lg z-10">
          <button @click="logout"
            class="block w-full text-left px-4 py-2 rounded-md text-sm text-blue-500 font-medium hover:bg-gray-50">
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
              <th class="p-2 text-left">Category Name</th>
              <th class="p-2 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="flex items-center p-2">
                <div>
                  <div class="font-semibold">Makanan</div>
                </div>
              </td>
              <td>
                <div class="flex items-center gap-3">
                  <button class="rounded-md
                                         bg-red-500 px-4 py-2 font-normal text-white hover:bg-red-600">
                    Delete Category
                  </button>
                  <button class="rounded-md
                                         bg-green-500 px-4 py-2 font-normal text-white hover:bg-green-600">
                    Edit Category
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
