<template>
  <div>
    <HeaderCrypto />
    <div class="tableAmounts">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Criptomoneda</th>
            <th>Cantidad</th>
            <th>Resultados (ARS)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(crypto, key) in cryptos" :key="key">
            <th scope="row">{{ crypto.name }}</th>
            <td>{{ crypto.amount }}</td>
            <td>${{ crypto.ganancias }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th colspan="2">Ganancias Totales $ARS</th>
            <td>${{ totalGanancias }}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
import HeaderCrypto from '@/components/HeaderCrypto.vue';
import { apiClient } from '@/services/ApiServices';
import axios from 'axios';

export default {
  components: { HeaderCrypto },
  data() {
    return {
      cryptos: {
        btc: { name: 'Bitcoin', amount: 0, ganancias: 0, diferencia: 0 },
        eth: { name: 'Ethereum', amount: 0, ganancias: 0, diferencia: 0 },
        dai: { name: 'Dai', amount: 0, ganancias: 0, diferencia: 0 },
      },
      totalGanancias: 0,
    };
  },
  created() {
    this.fetchTransactions();
  },
  methods: {
    async fetchTransactions() {
      const userId = localStorage.getItem('user_id');
      const { data: transactions } = await apiClient.get(`/transactions?q={"user_id":"${userId}"}`);
      this.calculateCryptoData(transactions);
    },
    async calculateCryptoData(transactions) {
      transactions.forEach(({ action, crypto_code, crypto_amount, money }) => {
        if (this.cryptos[crypto_code]) {
          const crypto = this.cryptos[crypto_code];
          const factor = action === 'purchase' ? 1 : -1;
          crypto.amount += factor * parseFloat(crypto_amount);
          crypto.diferencia += factor * parseFloat(money);
        }
      });
      await this.calculateGanancias();
    },
    async calculateGanancias() {
      const requests = Object.entries(this.cryptos).map(async ([code, crypto]) => {
        const { data } = await axios.get(`https://criptoya.com/api/argenbtc/${code}/ars/${crypto.amount}`);
        crypto.ganancias = data.totalBid - crypto.diferencia;
      });
      await Promise.all(requests);
      this.totalGanancias = Object.values(this.cryptos).reduce((sum, crypto) => sum + crypto.ganancias, 0);
    },
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