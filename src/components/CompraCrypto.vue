<template>
    
    <div>
      <HeaderCrypto></HeaderCrypto>
    </div>

    <div class="grid-layout" id="CompraCrypto">
    <section class="crypto">
    
    <form @submit.prevent="agregarCompra()" class="crypto-form"> 
      <h2>Comprar</h2>
      <label name="cryptomoneda">Cryptomoneda:</label>
      <select v-model="crypto_code" name="cryptomoneda" required>
        <option value="" disabled selected>Seleccione una cryptomoneda</option>
        <option value="btc">Bitcoin</option>
        <option value="dai">Dai</option>
        <option value="eth">Ethereum</option> 
      </select>
      <label name="cantidad">Ingrese la cantidad:</label>
      <input  v-model="crypto_amount"  id="cantidad" type="number" min="0.01" step="0.01" placeholder="Ingrese la cantidad" required> <!-- v-model nos permite ligar los campos input a variables de javascrip, v-model nos permite asignarle este input al campo dentro de la data que voy a asociar, el punto trim elimina los espacios en blanco -->
     
      <button type="submit">Comprar</button>
    </form>
    </section>
  </div> 
</template>


<script>
import {apiClient} from '@/services/ApiServices';
import HeaderCrypto from './HeaderCrypto.vue';
import Swal from 'sweetalert2';

export default {
    name: "HomeView",
    components: {
     HeaderCrypto
     
    },
    data() {
        return {
          
            user_id: localStorage.getItem("user_id"),
            action: "purchase",
            crypto_code: "",
            crypto_amount: 0,
            money: 0,
            datetime: "",
            //cryptos: ['BTC', 'ETH', 'USDT'],
          
        };
    },
    methods: {
        //metodo para mostar mensajes
        getAlert(messagge) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: messagge,
                showConfirmButton: false,
                timer: 2000
            })
        },
     async agregarCompra(){
      if (!this.crypto_code || this.crypto_amount <= 0) {
            Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Selecciona una criptomoneda y una cantidad válida.'
        });
          return;
        }
  
        const url = `https://criptoya.com/api/argenbtc/${this.crypto_code}/ars/${this.crypto_amount}`;
        try {
          const response = await fetch(url);
          const data = await response.json();
          this.money = data.totalAsk;
          let fechaHoraActual = new Date();
            let day = fechaHoraActual.getDate();
            let month = fechaHoraActual.getMonth() + 1;
            let year = fechaHoraActual.getFullYear();
            let hour = fechaHoraActual.getHours();
            let minute = fechaHoraActual.getMinutes();
            let second = fechaHoraActual.getSeconds();
            let millisecond = fechaHoraActual.getMilliseconds();
             
           let fechaa = `${year}-${`00${month}`.slice(-2)}-${`00${day}`.slice(-2)}T${`00${hour}`.slice(-2)}:${`00${minute}`.slice(-2)}:${`00${second}`.slice(-2)}.${`000${millisecond}`.slice(-3)}Z`;
           this.datetime = fechaa;

          this.$store.commit('addCrypto', {
            code: this.crypto_code,
            amount: this.crypto_amount,
            price: data.totalAsk,
          });

          const dataa = {
        user_id: this.user_id,
        action: this.action,
        crypto_code: this.crypto_code,
        crypto_amount: this.crypto_amount,
        money: this.money,
        datetime: this.datetime
      }

          const response1 = await apiClient.post('/transactions', dataa);

         this.getAlert(`Compraste ${this.crypto_amount} ${this.crypto_code} por ${data.totalAsk} ARS.`);
         console.log(response1)
        } catch (error) {
          alert('Error al comprar la criptomoneda.');
        }
           
      }
    }
  }









     /* try {

        const response = await apiClient.post('/transactions', dataa)
        
            this.getAlert('Compra Exitosa')
            console.log(response)
            
        
       
      }catch (error) {
        console.log(error)
    } */
</script>
<style>
.crypto h2{
  font-size: 36px;
  font-weight: 600;
  margin: 0 0 12px;
  text-align: center;
}
.crypto {
    margin: 80px;
    padding: 30px;
    display: flex;
    background-color: white;
    border: solid 1.5px rgb(252, 250, 250);
    border-radius: 16px;
}
.crypto-form{
  width: 100%;
  margin: 0;
  display: grid;
  gap:16px;
}
.crypto-form input,
.crypto-form select,
.crypto-form button{
  width: 100%;
  height: 50px;
}
.crypto-form input,
.crypto-form select
{
  border: 2px solid #ebebeb;
  font-family: inherit;
  font-size: 20px;
  padding: 0 25px;
  border-radius: 24px;
  transition: all 0.375s;

}
.crypto-form button{
  cursor: pointer;
  width: 100%;
  padding: 16px;
  border-radius: 25px;
  background-color: #2b06b1;
  color:white;
  border: 0;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  letter-spacing: 2px;
}
.grid-layout{
    display: grid;
    grid-template-areas: 'comprar';
    
   

}

.crypto{
    grid-area: comprar;
    
}


</style>