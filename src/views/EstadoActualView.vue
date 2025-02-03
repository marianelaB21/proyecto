<template>
    <div>
    <HeaderCrypto></HeaderCrypto>
  </div>
  <div>
    <h1 class="title">Mis Criptomonedas</h1>
    <div class="tableAmounts">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Criptomoneda</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Valor Total ($)</th>
            
          </tr>
        </thead>
        <tbody>
          <tr v-for="(amount, crypto) in cryptoBalances" :key="crypto">
          
            <th class="tg-kxt4">{{ crypto }}</th>
            <td class="tg-kxt4">{{ amount.quantity }}</td>
            <td class="tg-kxt4">{{ amount.totalValue.toFixed(2) }}</td>
           

          </tr>
          
        </tbody>
      </table>
    </div>
    <div class="totalAmount">
      <h2>Monto Total: ${{ totalMoney.toFixed(2) }}</h2>
    </div>
  </div>

</template>

<script>
import HeaderCrypto from '@/components/HeaderCrypto.vue'
import {apiClient} from '@/services/ApiServices';

export default {
  name:"EstadoActualView",
  components: {
      HeaderCrypto,
  },
  data() {
    return {
      user_id: localStorage.getItem("user_id"),
        cryptoBalances: {},
        totalMoney: 0,

    };
  },
  
  methods: {
    async fetchCryptoData() {
        try {
          const response = await apiClient.get(`/transactions?q={"user_id": "${this.user_id}"}`);
          this.processCryptoData(response.data);
        } catch (error) {
          console.error("Error fetching crypto data:", error);
        }
      },
      async  processCryptoData(data) {
       
        // Aquí asumimos que `data` es un array de transacciones
        const transactions = data; // Cambia esto según la estructura de tu respuesta
  
        transactions.forEach(transaction => {
          const { crypto_code, crypto_amount, money, action } = transaction;
  
          // Inicializamos el balance si no existe
          if (!this.cryptoBalances[crypto_code]) {
            this.cryptoBalances[crypto_code] = { quantity: 0, totalValue: 0 };
          }
  
          // Actualizamos la cantidad y el valor total
          if (action === 'purchase') {
            this.cryptoBalances[crypto_code].quantity += parseFloat(crypto_amount);
            this.cryptoBalances[crypto_code].totalValue += parseFloat(money);
            
          } else if (action === 'sale') {
            this.cryptoBalances[crypto_code].quantity -= parseFloat(crypto_amount);
            this.cryptoBalances[crypto_code].totalValue -= parseFloat(money);
          }
        });
        
        // Calculamos el monto total
        this.calculateTotalMoney();
      },
      calculateTotalMoney() {
        this.totalMoney = Object.values(this.cryptoBalances).reduce((total, crypto) => {
          return total + crypto.totalValue;
        }, 0);
      },

      
  },
  mounted() {
    const userId = this.user_id; // Cambia esto por el ID del usuario real
    this.fetchCryptoData(userId);
  },
  
};
</script>
<style scoped>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
body{
    font-family: 'Inter', sans-serif;
    color: #343a40;
    line-height: 1;
    display: flex;
    justify-content: center;
}

table{
    width: 800px;
    margin-top: 100px;
    border-collapse:collapse;
    font-size:18px;
}

th,td {
    padding: 16px 24px;
    text-align:left;
}

thead th{
    background-color: #08697f;
    color:white;
    width:25%;
}

tbody tr:nth-child(odd){
    background-color: #f8f9fa;
}
tbody tr:nth-child(even){
    background-color: #e9ecef;
}

</style>