<script setup>
//const {data,error,pending } = await useFetch('https://dummyjson.com/products');

const {data,error,pending } = await useAsyncData('products',() => $fetch('https://dummyjson.com/products'), {
    lazy:true
})
</script>
<template>
    <div>
        <h1 v-if="pending">Cargando datos...</h1>
        <div v-else>
            <h1>Productos</h1>
            <div class="grid">
                <Card v-for="product in data.products" :key="product.id" :product="product" />
            </div>
        </div>

    </div>
</template>

<style scoped>
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
    gap: 2rem;
}
</style>
