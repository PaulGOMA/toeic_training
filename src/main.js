import './assets/main.css'

import { createApp } from 'vue'
import Primevue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import App from './App.vue';
import router from './router';

const app = createApp(App)
app.use(Primevue, {
    theme: {
        preset: Aura
    }
});
app.use(router);
app.mount('#app')
