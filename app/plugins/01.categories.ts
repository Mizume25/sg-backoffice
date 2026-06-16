export default defineNuxtPlugin(async () => {
    
    const store = useCategoriesStore()

    const categories = useState<CategoryRecord []>('categories', () => [])

    if(!categories.value.length) categories.value = await $fetch<CategoryRecord[]>('/api/categories');

    store.setCategories(categories.value);

    
})
