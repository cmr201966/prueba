import { createStore } from 'vuex';

export default createStore({
  state: {
    searchQuery: '',  // Almacenará el valor de búsqueda globalmente
  },
  mutations: {
    setSearchQuery(state, query) {
      state.searchQuery = query;  // Mutación para actualizar la búsqueda
    },
  },
  actions: {
    updateSearchQuery({ commit }, query) {
      commit('setSearchQuery', query);  // Acción para llamar a la mutación
    },
  },
  getters: {
    getSearchQuery(state) {
      return state.searchQuery;  // Getter para acceder al valor de búsqueda
    },
  },
});
