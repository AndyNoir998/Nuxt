<script setup lang="ts">
   definePageMeta({
        layout:'lista'
    })

</script>

<template>
    <div class="container">
        <div class="row">
            <h1>Gestion de productos</h1>
        </div>
        <div class="row ">
            <div class="col-6">
                <NuxtLink class="btn btn-primary m-2" to="/lista">Lista productos</NuxtLink>
                <NuxtLink class="btn btn-primary m-2" to="/lista/orderList">Lista oredenes</NuxtLink>
                <NuxtLink class="btn btn-primary m-2" to="/lista/crearOrden">Crear orden</NuxtLink>
            </div>
                
            <div class="col-6">
                <NuxtPage />
            </div>
        </div>
        
    </div>
</template>