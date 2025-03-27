<template>
  <DefaultLayout>
    <v-container class="div-anuncios anuncios container-anuncios">
      <h3 class="strong">Publicar anuncios</h3>

      <!-- Combo con los anuncios obtenidos -->
      <v-select class="app-select custom-select"
         v-model="selectedAnuncio"
         label="Anuncio"
         :items="filteredAnuncios"
         item-text="title"
         item-value="id"             
         density="compact"
      ></v-select>

      <v-text-field v-if="agregarsn || editarsn" 
         class="form-control app-input-area"
         ref="descFoco"
         v-model="descripcion"
         label="descripcion"
         density="compact"
      />

      <!-- Contenedor para los botones alineados a la derecha -->
      <v-row class="grupo-button-app">
        <v-spacer></v-spacer> <!-- Empuja los botones a la derecha -->

        <v-btn v-if="agregarsn || editarsn" color="success" class="mr-2" @click="confirmarAnuncio">
           <v-icon left>mdi-check</v-icon> 
           Confirmar
        </v-btn>
        <v-btn v-if="!agregarsn && !editarsn" color="success" class="mr-2" @click="agregarAnuncio">
           <v-icon left>mdi-plus</v-icon> 
           Agregar
        </v-btn>
        <v-btn v-if="!agregarsn && !editarsn" color="warning" class="mr-2" @click="editarAnuncio">
          <v-icon left>mdi-pencil</v-icon> 
          Editar
        </v-btn>

        <v-btn v-if="!agregarsn && !editarsn" color="error"  @click="eliminarAnuncio">
          <v-icon left>mdi-delete</v-icon>
          Eliminar
        </v-btn>
        <v-btn v-if="agregarsn || editarsn" color="error"  @click="cancelarAnuncio">
          <v-icon left>mdi-close</v-icon>
          Cancelar
        </v-btn>
      </v-row>
    </v-container>
  </DefaultLayout>
</template>

<script>
import { ref } from 'vue';
import DefaultLayout from '../layouts/DefaultLayout.vue';
import api from '../api/axios';
import emitter from '../eventBus'; // Importamos el bus de eventos

export default {
  name: 'Anuncios',
  components: {
    DefaultLayout
  },
  data() {
    return {
      anuncios: [],             // Almacenará los anuncios
      filteredAnuncios: [], // Almacena los anuncios filtrados
      selectedAnuncio: null,    // Almacenará el anuncio seleccionado
      descripcion: "",
      agregarsn: false,
      editarsn: false,
      eliminarsn: false
    };
  },

  mounted() {
    // Llamada a la API para obtener los anuncios al montar el componente
    this.fetchAnuncios();
    // Escuchamos el evento 'search' para filtrar los anuncios
    emitter.on('search', this.filterAnuncios);    
  },
  

  beforeUnmount() {
    // Aseguramos de limpiar el evento cuando el componente se destruya
    emitter.off('search', this.filterAnuncios);
  },

  methods: {

    filterAnuncios(searchText) {
      if (!searchText) {
        this.filteredAnuncios = this.anuncios;
      } else {
        this.filteredAnuncios = this.anuncios.filter(anuncio =>
          anuncio.title.toLowerCase().includes(searchText.toLowerCase())
        );
      }
    },

    setFocus() {
      // Aquí se coloca el foco en el v-text-field
      this.$nextTick(() => {
        if (this.$refs.descFoco) {
          this.$refs.descFoco.focus();
        } else {
          console.warn('El campo con ref "desc" no está disponible.');
        }
      });
    },

    async confirmarAnuncio() {
      const anuncioData = {
        descripcion: this.descripcion,  // Valor de la descripción
      };
      
      if (!this.agregarsn) {
        // Si no es un nuevo anuncio, agregamos el ID
        anuncioData.id = this.selectedAnuncio;
      }
      try {
        // Llamamos al backend para guardar el anuncio (insertar o actualizar)
        const response = await api.post('/set_anuncio', anuncioData);
        
        // Confirmación de que se guardó correctamente
        console.log(response.data.message);
        // Refrescar el select con los anuncios actualizados
        this.fetchAnuncios();
      } catch (error) {
        console.error('Error de autenticación', error);
        alert('Credenciales incorrectas');
      }

      this.agregarsn = false;
      this.editarsn = false;
    },

    cancelarAnuncio() {
      this.agregarsn = false;
      this.editarsn = false;
    },

    agregarAnuncio() {
      this.descripcion = "";
      this.agregarsn = true;
      this.setFocus();
    },

    async editarAnuncio() {
      // Buscar el id en backend para tomar la desc y poder editarla
      const response = await api.get(`/get_anuncio/${this.selectedAnuncio}`);
      this.descripcion = response.data.descripcion;
      this.editarsn = true;
      this.setFocus();
    },

    async eliminarAnuncio() {
      try {
        const response = await api.delete(`/del_anuncio/${this.selectedAnuncio}`);
        // Refrescar el select con los anuncios actualizados
        this.fetchAnuncios();
      } catch (error) {
        console.error('Error al eliminar el anuncio:', error.response || error);
        alert('Error al eliminar');
      }
    },


    // Método para obtener los anuncios
    async fetchAnuncios() {
      try {
        // Realizamos la solicitud GET para obtener los anuncios
        const response = await api.get('/anuncios');  // Asumimos que este es el endpoint correcto
        
        let anunciosFormateados = [];
        
        // Verificamos que los datos sean un array
        if (Array.isArray(response.data)) {
          for (let i = 0; i < response.data.length; i++) {
            let fila = response.data[i];

            // Creamos un objeto con las propiedades id y desc
            let anuncio = {
              id: fila[0],    // El ID del anuncio
              title: fila[1],  // La descripción del anuncio
            };

            // Añadimos el objeto formateado al array anunciosFormateados
            anunciosFormateados.push(anuncio);
            // Inicializamos filteredAnuncios con todos los anuncios al principio
          }

          // Asignamos el array formateado a 'this.anuncios'
          this.anuncios = anunciosFormateados;
          this.filteredAnuncios = anunciosFormateados; // Inicializar los anuncios filtrados
        }
      } catch (error) {
        console.error('Hubo un error al obtener los anuncios:', error);
      }
    }
  }
};
</script>

<style>
</style>


