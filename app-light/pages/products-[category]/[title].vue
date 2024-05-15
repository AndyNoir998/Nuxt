<script lang="ts" setup>
    const route = useRoute()
     
</script>
<template>
    <div>
        <h1>Ruta de parametros</h1>
        <h1>Parametro 1: {{ route.params.title }}</h1>
        <h1>Parametro 1: {{ route.params.category }}</h1>
    </div>
</template>