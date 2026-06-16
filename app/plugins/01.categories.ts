export default defineNuxtPlugin(async () => {
    
    const categories = await $fetch('/api/categories');

    const store = useCategoriesStore()

    store.setCategories(categories);

    
})
