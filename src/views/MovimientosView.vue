<template>
    <div>
      <HeaderCrypto></HeaderCrypto>
    </div>
    <HistorialCrypto></HistorialCrypto>
  </template>
  
  <script>
  import HeaderCrypto from '@/components/HeaderCrypto.vue';
  import HistorialCrypto from '@/components/HistorialCrypto.vue';
  export default {
      name: "MovimientosCrypto",
      components: {
       HeaderCrypto,
       HistorialCrypto,
      },
      
      
  }
  
  
  </script>