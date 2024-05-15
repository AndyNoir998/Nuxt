<template>
    <div class="orders-list-container">
        <h1>Lista de ordenes</h1>
        <table class="orders-table">
            <thead>
                <tr>
                    <th>Numero de orden</th>
                    <th>Total</th>
                    <th>Acciones</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="order in orders" :key="order.id">
                    <td>{{ order.orderNumber }}</td>
                    <td>${{ order.total }}</td>
                    <td>
                        <button class="btn-small btn danger" @click="deleteOrder(order.id)">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <NuxtLink class="btn btn-primary mt-2" to="/lista/crearOrden">Crear Nueva orden</NuxtLink>
    </div>
</template>

<script>
import { db } from '../firebaseConfig';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';

export default {
    data() {
        return {
            orders: [],
        };
    },
    async created() {
        await this.fetchOrders();

    },
    methods: {
        async fetchOrders() {
            const querySnapshot = await getDocs(collection(db, "orders"));
            this.orders = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        },
        async deleteOrder(id) {
            await deleteDoc(doc(db, "orders", id));
            await this.fetchOrders();
        },

    }

};
</script>

<style scoped>
.orders-list-container {
    max-width: 800px;
    margin: auto;
    padding: 20px;
}

.orders-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

.orders-table th,
.orders-table td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
}

.orders-table th {
    background-color: #f5f5f5;
}

.btn-small, .btn-danger {
    background-color: #dc3545;
    color: white;
}

.btn-small:hover,
.btn-small.btn-danger:hover{
    opacity: 8.8;
}

</style>