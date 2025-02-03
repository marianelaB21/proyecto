<template>
  <div>
    <HeaderCrypto></HeaderCrypto>
  </div>
  <div>
   
    <Carousel></Carousel>
  </div>

  <div class="container" id="CompraCrypto">

    <CompraCrypto></CompraCrypto>
    <VentaCrypto></VentaCrypto>
  </div>

</template>

<script>
import CompraCrypto from '@/components/CompraCrypto.vue'
import VentaCrypto  from '@/components/VentaCrypto.vue'
import HeaderCrypto from '@/components/HeaderCrypto.vue'

import Carousel from '@/components/CarouselCrypto.vue'
export default {
  name:"HomeView",
  components: {
      HeaderCrypto,
      CompraCrypto,
      VentaCrypto,
      
      Carousel,
  },
};
</script>
<style>
.container {
  display: flex;
  justify-content: space-between; /* Espaciado entre los elementos */
  align-items: flex-start; /* Alineación vertical */
  gap: 10px; /* Espaciado entre los componentes */
}
</style>