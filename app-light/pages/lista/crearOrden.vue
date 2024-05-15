<template>
    <div class="create-order-container">
        <h1>Crear nueva orden</h1>

        <form @submit.prevent="submitOrder">
            <input v-model="newOrder.orderNumber" placeholder="Numero Orden" class="input-style" />

            <table class="product-selection-table">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Añadir</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in availableProducts" :key="product.id">
                        <td>{{ product.nombre }}</td>
                        <td>{{ product.precio }}</td>
                        <td>
                            <input type="number" v-model="product.cantidad" min="0" placeholder="Cantidad" class="input-style" />
                        </td>
                        <td>
                            <button type="button" @click="addProductToOrder(product)" class="add-button"
                                :disabled="isProductAdded(product)">Añadir</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <h2>Productos seleccionados:</h2>
            <ul>
                <li v-for="(item, index) in newOrder.products" :key="index">
                    {{ item.nombre }} - Cantidad: {{ item.cantidad }} - Total: ${{ item.total }}
                    <button @click="removeProductFromOrder(index)" class="btn-small btn-danger">Remover</button>
                </li>
            </ul>
            <p><strong>Total de la Orden: ${{ newOrder.total }}</strong></p>
            <button type="submit" class="submit-button">Enviar orden</button>
        </form>
    </div>
</template>

<script>
import { db } from '../firebaseConfig';
import { collection, getDocs, addDoc } from 'firebase/firestore';

export default {
    data() {
        return {
            newOrder: {
                orderNumber: '',
                products: [],
                total: 0,
            },
            availableProducts: [],
        };
    },
    async created() {
        await this.fetchProducts();

    },
    methods: {
        async fetchProducts() {
            const querySnapshot = await getDocs(collection(db, "products"));
            this.availableProducts = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                cantidad: 0,
            }));
        },
        addProductToOrder(selectedProduct) {
            if (selectedProduct.cantidad <= 0) {
                alert('Por favor añada una cantidad valida');
                return;
            }
            const productTotal = selectedProduct.precio * selectedProduct.cantidad;
            const productAdd = {
                ...selectedProduct,
                total: productTotal,
            };
            this.newOrder.products.push(productAdd)
            this.calculateOrderTotal();
        },
        calculateOrderTotal() {
            this.newOrder.total = this.newOrder.products.reduce((acc, product) => acc + product.total, 0)
        },
        isProductAdded(product) {
            return this.newOrder.products.some(item => item.id === product.id);
        },
        removeProductFromOrder(index) {
            this.newOrder.products.splice(index, 1);
            this.calculateOrderTotal();
        },
        async submitOrder() {
            if (this.newOrder.products.length === 0) {
                alert("Por favor agregue por lo menos un producto a la orden.");
                return;
            }
            await addDoc(collection(db, "orders"), this.newOrder);
            alert('Orden creada con exito.');
            this.resetOrderForm();
        },
        resetOrderForm() {
            this.newOrder = { orderNumber: '', products: [], total: 0 };
            this.availableProducts.forEach(product => product.cantidad = 0)
        },
    }

};
</script>

<style scoped>
.create-order-container {
    max-width: 800px;
    margin: auto;
    padding: 20px;
    border: 1px solid;
    border-radius: 8px;
    background: #f9f9f9;
}

form {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input[type="number"],
input[type="text"] {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
}

button {
    font-size: 1rem;
}

.add-button {
    background-color: #007bff;
    color: white;
}

.add-button:hover {
    background-color: #0056b3;
}

.submit-button {
    background-color: #28a745;
    color: white;
}

.submit-hover {
    background-color: #218838;
    color: white;
}

ul {
    list-style: none;
    padding: 0;
}

li {
    background: #e9ecef;
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.btn-small {
    padding: 5px 10px;
    font-size: 0.8rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.btn-danger {
    background-color: #dc3545;
    color: white;
}

.btn-danger:hover {
    background-color: #c82333;
}

h2,
p {
    margin-top: 20px;
}

.product-selection-table {
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;
}

.product-selection-table th,
.product-selection-table td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
}

.product-selection-table input[type="number"] {
    max-width: 80px;
}

.product-selection-table th {
    background-color: #f5f5f5;
}

.product-selection-table td:nth-child(1) {
    width: 50%;
}

.product-selection-table th:nth-child(2),
.product-selection-table td:nth-child(3) {
    width: 15%;
}

.product-selection-table td:nth-child(4) {
    width: 15%;
}

.input-style {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
}

.add-button[disabled] {
    background-color: #ccc;
    cursor: not-allowed;
}
</style>