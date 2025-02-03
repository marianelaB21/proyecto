import { createStore } from 'vuex'

export default createStore({
  state: {
    compras: [],
    
    
  },
  getters: {
    
  },
  mutations: {
    addCrypto(state, payload) {
      const existing = state.compras.find((c) => c.code === payload.code);
      if (existing) {
        existing.amount += payload.amount;
      } else {
        state.compras.push(payload);
      }
    },
    sellCrypto(state, payload) {
      const crypto = state.compras.find((c) => c.code === payload.code);
      if (crypto) {
        crypto.amount -= payload.amount;
        if (crypto.amount <= 0) {
          state.compras = state.compras.filter((c) => c.code !== payload.code);
        }
      }
    },
    
  },
  actions: {
   

  },
  modules: {
  },
 
})
