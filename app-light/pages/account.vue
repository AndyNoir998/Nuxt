<script setup lang="ts">
   definePageMeta({
        layout:'authentication'
    })

</script>

<template>
    <div class="container">
        <div class="row">
            <h1>Mi cuenta</h1>
        </div>
        <div class="row">
            <div class="col-6">
                <NuxtLink class="btn btn-primary" to="/account/login">Login</NuxtLink>
                <NuxtLink class="btn btn-primary" to="/account/register">Register</NuxtLink>
            </div>
                
            <div class="col-6">
                <NuxtPage />
            </div>
        </div>
        
    </div>
</template>