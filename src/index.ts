import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import App from './components/App.vue';
import './styles/main.scss';

console.log('DDB DM Screen Started');

const app = createApp(App);
app.use(PrimeVue);
app.use(ConfirmationService);
app.mount('.listing-body');
