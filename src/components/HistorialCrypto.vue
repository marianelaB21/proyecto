<template>
    <div class="historial">
      <table v-if="listarCripto.length > 0">
        <thead>
            <tr>
                <th>Action</th>
                <th>Code</th>
                <th>Amount</th>
                <th>Money</th>
                <th>Date</th>
            </tr>
        </thead>

        <tbody >
            <!-- <tr v-for="(Cripto, index) in listarCripto" :key="index">-->
            <tr v-for="Cripto in listarCripto" :key="Cripto.id">
            <td >{{ Cripto.action }}</td>
            <td>{{  Cripto.crypto_code }}</td>
            <td>{{  Cripto.crypto_amount }}</td>
            <td>{{  Cripto.money }}</td>
            <td>{{  Cripto.datetime.toLocaleString() }}</td>
            <td><button class="btn btn-info" @click="obtener(Cripto._id, 1)">Detalles</button></td>
            <td><button class="btn btn-warning" @click="obtener(Cripto._id)">Editar</button></td>
            <td><button class="btn btn-danger" @click="eliminar(Cripto._id)">Eliminar</button></td>
            </tr>
        </tbody>
      </table>    
</div>

<div>
    <div class="modal" v-if="modalOne">
      <div class="modal-content">
        <span class="close" @click="modalOne = false">&times;</span>
        <h2 class="modal-title">Detalles</h2>
      
      <div class="modal-body">
        <form>
          <div class="form-group">
          <label for="tipo">Action:</label>
          <select id="tipo" v-model="detalles.action"  disabled> 
            <option value="" disabled selected>Seleccione una opción</option>
            <option value="purchase">Compra</option>
            <option value="sale">Venta</option>
          </select>
          </div>
          <div class="form-group">
          <label for="criptomonedas">Criptomonedas:</label>
          <select id="criptomonedas" v-model="detalles.crypto_code" disabled>
            <option value="" disabled selected>Seleccione una opción</option>
            <option value="btc">Bitcoin</option>
           <option value="dai">Dai</option>
           <option value="eth">Ethereum</option> 
          </select>
          </div>
          <div class="form-group">
          <label for="cantidad">Cantidad:</label>
          <input type="number" id="cantidad" min="0.01" step="0.01" v-model="detalles.crypto_amount" disabled />
          </div>
          <div class="form-group">
          <label for="precio">Precio:</label>
          <input type="number" id="precio" v-model="detalles.money" disabled />
          </div>
          <div class="form-group">
          <label for="fecha">Fecha:</label>
          <input type="text" id="fecha" :value="detalles.datetime" disabled />
          </div>
        </form>
      </div>
      </div>
    </div>
  </div>

  
  <div v-if="modalDos" class="modal">
    <div class="modal-content">
    
        <span class="close" @click="modalDos = false">&times;</span>
        <h2 class="modal-title">Editar</h2>
      
      <div class="modal-body">
        <form>
          <div class="form-group">
          <label for="tipo">Action:</label>
          <select id="tipo" v-model="detalles.action"  required> 
            <option value="" disabled selected>Seleccione una opción</option>
            <option value="purchase">Compra</option>
            <option value="sale">Venta</option>
          </select>
          </div>
          <div class="form-group">
          <label for="criptomonedas">Criptomonedas:</label>
          <select id="criptomonedas" v-model="detalles.crypto_code" required>
            <option value="" disabled selected>Seleccione una opción</option>
            <option value="btc">Bitcoin</option>
           <option value="dai">Dai</option>
           <option value="eth">Ethereum</option> 
          </select>
          </div>
          <div class="form-group">
             <label for="cantidad">Cantidad:</label>
             <input type="number" id="cantidad" min="0.01" step="0.01" v-model="detalles.crypto_amount" required />
          </div>
          <div class="form-group">
            <label for="precio">Precio:</label>
            <input type="number" id="precio" v-model="detalles.money" disabled />
          </div>
          <div class="form-group">
             <label for="fecha">Fecha:</label>
             <input type="text" id="fecha" :value="detalles.datetime" disabled />
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button class="button" @click="editar(detalles._id)">Guardar</button>
        
      </div>
    </div>
  </div>
</template>

<script>
import {apiClient} from '@/services/ApiServices';
import Swal from 'sweetalert2';
export default {
name: 'Historial-Crypto',
data(){
      return{
        listarCripto: [],
        detalles:{
             _id: "",
            action: "",
            crypto_amount: "",
           crypto_code: "",
           datetime: "",
            money: "",
        },
        user_id: localStorage.getItem("user_id"),
        
      modalOne: false,
      modalDos: false,
     // datos: {},
        
      };
    },
    methods: {
      getAlert(messagge) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: messagge,
                showConfirmButton: false,
                timer: 2000
            })
        },
        //detalles(id){
       //   this.$router.push('/detalles/' + id)
       // },
     obtener (id,accion) {
        //this.datos = {};
        if(accion == 1){
            this.modalOne = true;
        }
        else{
            this.modalDos=true;
        }

    apiClient
     .get(`/transactions/${id}`)
     .then((response) => {
        this.detalles = response.data;
         this.detalles.action = response.data.action;
         this.detalles.crypto_code = response.data.crypto_code;
         this.detalles.crypto_amount = response.data.crypto_amount;
         this.detalles.money = response.data.money;
         this.detalles.datatime = response.data.datatime;
         
     })
     .catch((error) => {
        console.error("Error al obtener los detalles:", error);
      })
     
    },
  async  editar(id){
      const res = await fetch(`https://criptoya.com/api/argenbtc/${this.detalles.crypto_code}/ars/${this.detalles.crypto_amount}`);
            const datos = await res.json();
            this.detalles.money = datos.totalAsk;
            this.detalles.datetime = new Date().toISOString();

      apiClient
     .patch(`/transactions/${id}`, this.detalles)
     .then((response) => {
        console.log(response)
        this.getAlert("Editado Correctamente")
        this.modalDos = false;
        this.obtener();
         
     })

     .catch((error) => {
        console.error("Error al editar:", error);
      })
    },
    eliminar(id){
      Swal.fire({
  title: "Estas seguro de eliminar?",
  text: "Si continuas, no puedes revertir la accion!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Si, eliminar!"
}).then((result) => {
  if (result.isConfirmed) {
    apiClient
     .delete(`/transactions/${id}`)
     .then((response) => {
        console.log(response)
        this.getAlert("Eliminado Correctamente")
         
     })

     .catch((error) => {
        console.error("Ha ocurrido un error:", error);
      })
  }
});






    },
  },
    created() {

    apiClient.get(`/transactions?q={"user_id": "${this.user_id}"}`)
      .then(response => {
        if (response.data && response.data.length > 0) {
            this.listarCripto = response.data;
          } else {
            this.listarCripto = [];  
          }
      })
      .catch(error => {
        console.error('Error al obtener datos de la API:', error);
      });
  },
 
}
</script>
<style scoped>
.popup {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.popup-content {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
.historial {
    margin: 80px;
    padding: 30px;
}

table {
    width: 800px;
    font-family: sans-serif;
    font-weight: 100;
    border-collapse: collapse;
    overflow: hidden;
    box-shadow: 0 0 20px #0000001a;

}
th,
td {
    background-color: #ffffff33;
    padding: 15px;
    color: #fff;
}
th {
    text-align: left;
}
thead th {
  background-color: #55608f;
    
}
tbody tr:hover {
  background-color: #ffffff4d;
   
}
tbody td {
    position: relative;
}
tbody td:hover::before {
content: "";
position: absolute;
background-color: #ffffff33;
left: 0;
right: 0;
top: -9999px;
bottom: -9999px;
z-index: -1;
} 

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

h2 {
  margin: 0 0 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 10px 0;
}



/*estilos para el modal*/
/* Estilos generales del modal */
/* .modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); 
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; 
}


.modal-content {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  width: 400px; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
*/

/* Estilo del título del modal */
.modal-title {
  font-size: 1.5em;
  margin: 0;
}

/* Estilo del botón de cerrar 
.close {
  cursor: pointer;
  font-size: 1.2em;
} */

/* Estilo del cuerpo del modal */
.modal-body {
  margin: 20px 0;
}

/* Estilo del pie del modal */
.modal-footer {
  display: flex;
  justify-content: flex-end;
}

/* Estilo de los botones */
.button {
  background-color: #007bff; /* Color del botón */
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: #0056b3; /* Color del botón al pasar el mouse */
}

/* Estilos para los inputs y selects */
input[type="number"],
select {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* Estilo para inputs deshabilitados */
input[disabled] {
  background-color: #f9f9f9; /* Color de fondo para inputs deshabilitados */
  color: #999; /* Color de texto para inputs deshabilitados */
  cursor: not-allowed; /* Cambia el cursor para indicar que está deshabilitado */
}

/* estilos para los botones */
/* Base button styles */
.btn {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  border: 1px solid transparent;
  cursor: pointer;
  text-decoration: none;
  color: #fff;
}

/* Danger button styles */
.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
}

.btn-danger:hover {
  background-color: #c82333;
  border-color: #bd2130;
}

/* Warning button styles */
.btn-warning {
  background-color: #ffc107;
  border-color: #ffc107;
  color: #212529;
}

.btn-warning:hover {
  background-color: #e0a800;
  border-color: #d39e00;
}

/* Info button styles */
.btn-info {
  background-color: #17a2b8;
  border-color: #17a2b8;
}

.btn-info:hover {
  background-color: #138496;
  border-color: #117a8b;
}


/* Contenedor para el label y el input */
.form-group {
  display: flex;
  align-items: center; /* Alinea verticalmente los elementos */
  gap: 10px; /* Espaciado entre el label y el input */
}

/* Opcional: Estilo para el label */
label {
  font-size: 1em;
  color: #333;
}

/* Opcional: Ajusta el ancho del input */
input[type="number"] {
  flex: 1; /* Toma el espacio restante si es necesario */
}

</style>