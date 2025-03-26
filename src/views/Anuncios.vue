
<template>
  <DefaultLayout>
    <v-container class="div-anuncios anuncios container-anuncios">
      <h3 class="strong">Publicar anuncios</h3>
      <label>Anuncio</label>

      <!-- Combo con los anuncios obtenidos -->
      <v-select class="app-select custom-select"
         v-model="selectedAnuncio"   
         :items="anuncios"           
         item-text="title"
         item-value="id"             
         outlined
         style="height: 32px;"   
      ></v-select>


      <label v-if="agregarsn || editarsn">Descripción</label>
      <v-text-field v-if="agregarsn || editarsn" class="form-control app-input-area"
         v-model="descripcion"
         outlined
         dense
         style="height: 20px;" 
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

export default {
  name: 'Anuncios',
  components: {
    DefaultLayout
  },
  data() {
    return {
      anuncios: [],             // Almacenará los anuncios
      selectedAnuncio: null,    // Almacenará el anuncio seleccionado
      descripcion: "",
      agregarsn : false,
      editarsn  : false,
      eliminarsn : false
    };
  },
  mounted() {
    // Llamada a la API para obtener los anuncios al montar el componente
    this.fetchAnuncios();
  },
  methods: {
    confirmarAnuncio() {
      this.agregarsn=true;
    },
    cancelarAnuncio() {
      this.agregarsn=false;
      this.editarsn=false;
    },
    agregarAnuncio() {
      this.agregarsn=true;
    },
    editarAnuncio() {
      this.editarsn=true;
    },
    eliminarAnuncio() {
    },
    async add_Anuncio() {
      try {
      const response = await api.post('/add_anuncio', {
        desc: anuncio.value,
      });
      localStorage.setItem('token', response.data.token);
      router.push('/');      
      } catch (error) {
        console.error('Error de autenticación', error);
        alert('Credenciales incorrectas');
      }
    },
    async editAnuncio() {
      console.log(this.selectedAnuncio)
      return
      try {
      const response = await api.post('/edit_anuncio', {
        desc: anuncio.value,
      });
      router.push('/');      
      } catch (error) {
        console.error('Error al editar', error);
        alert('Error al editar');
      }
    },

    async delAnuncio() {
      try {
      const response = await api.post('/del_anuncio', {
        id: anuncio.id,
      });
      router.push('/');      
      } catch (error) {
        console.error('Error al editar', error);
        alert('Error al editar');
      }
    },


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
      }

      // Asignamos el array formateado a 'this.anuncios'
      this.anuncios = anunciosFormateados;
      console.log(this.anuncios)
    }
  } catch (error) {
    console.error('Hubo un error al obtener los anuncios:', error);
  }
}
  }
};
</script>
<style>
/* Ajusta el estilo de la lista desplegable */
.v-overlay-container .v-list {
  padding: 0 !important; /* Elimina padding interno de la lista */
}

/* Ajusta cada ítem individualmente */
.v-overlay-container .v-list-item {
  min-height: 28px !important; /* Reduce la altura de las opciones */
  padding: 3px 5px !important; /* Reduce el espacio interior */
}
.custom-select .v-field__input {
    min-height: 0 !important;  /* Elimina el min-height */
  }
.custom-select .v-select__control {
min-height: 0 !important;  /* Quita el min-height */
}

.custom-select .v-select__slot {
min-height: 0 !important;  /* Opcional: también puedes quitar min-height del contenedor */
}

.custom-input .v-input__control {
  min-height: unset !important;  /* Quitar altura mínima */
  padding: 0 !important;         /* Eliminar relleno interno */
  margin: 0 !important;          /* Quitar margen */
  background: transparent !important; /* Eliminar color de fondo */
  border: none !important;        /* Eliminar borde */
  box-shadow: none !important;    /* Eliminar sombras */
}

.custom-input .v-input__control:before,
.custom-input .v-input__control:after {
  display: none !important; /* Eliminar líneas subrayadas */
}
</style>
