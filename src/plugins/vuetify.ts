// src/plugins/vuetify.ts
import 'vuetify/styles'; // Importa estilos globales de Vuetify
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives,
});

export default vuetify;
