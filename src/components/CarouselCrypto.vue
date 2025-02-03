<template>
  <div class="carousel-container" :style="{ backgroundImage: `url(${bannerImage})` }">
    <Swiper
      :modules="[SwiperAutoplay]"
      :slides-per-view="1"
      :loop="true"
      :autoplay="{ delay: 3000 }"
      class="swiper-container"
    >
      <SwiperSlide v-for="crypto in cryptos" :key="crypto.name" class="slide">
        <div class="crypto-card">
          <img :src="crypto.image" :alt="crypto.name" class="crypto-image" />
          <h3 class="crypto-name">{{ crypto.name }}</h3>
          <p class="crypto-price"> $ {{ crypto.price }}</p>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay as SwiperAutoplay } from "swiper/modules";
import "swiper/css";
import bannerImage from "@/assets/banner2.jpg";
export default {
  data() {
    return {
      bannerImage,
    };
  },
  components: { Swiper, SwiperSlide },
  setup() {
    const cryptos = [
      { name: "Bitcoin", price: "127.079.697", image: "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=024" },
      { name: "Ethereum", price: "3.403.060", image: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=024" },
      { name: "Dai", price: "1.240,14", image: "https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png?v=024" }
    ];
    
    return { cryptos, SwiperAutoplay };
  }
};
</script>

<style scoped>
.carousel-container {
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 80px;
}

.swiper-container {
  width: 100%;
  height: 100%;
}

.slide {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.crypto-card {
  text-align: center;
  color: white;
  background: rgba(0, 0, 0, 0.7);
  padding: 40px;
  border-radius: 10px;
  max-width: 500px;
  width: 80%;
}

.crypto-image {
  width: 120px;
  height: 120px;
  object-fit: contain;
}

.crypto-name {
  font-size: 1.8em;
  margin: 10px 0;
}

.crypto-price {
  font-size: 1.4em;
}
</style>
