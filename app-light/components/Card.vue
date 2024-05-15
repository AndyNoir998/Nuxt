<script lang="ts" setup>
defineProps(['product'])
</script>

<template>
    <div class="card" style="width: 18rem;">
        <img :src="product.thumbnail" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">{{product.title}}</h5>
            <p class="card-text">Encuentra el equilibrio perfecto entre rendimiento y elegancia con nuestra amplia gama de productos.
                </p>
            <NuxtLink :to="{name:'products-category-title', params:{ title: product.title, category: product.category}}" class="btn btn-primary"> Producto</NuxtLink>
        </div>
    </div>
</template>
