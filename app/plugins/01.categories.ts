
/** Plugin para arrancar con store de categorias */
export default defineNuxtPlugin( () => {
    
    const store = useCategoriesStore()

    const categories = useState<CategoryRecord []>('categories', () => [])


    const { data:allcategories } = useCategoriesApi().listCategories();

    if(!categories.value.length) categories.value = allcategories.value

    store.setCategories(categories.value);

    
})
