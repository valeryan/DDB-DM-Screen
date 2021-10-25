import { createApp } from "vue";
import App from "./components/App.vue";

console.log('DDB DM Screen Started');

const script = document.createElement('script');
script.src = "http://localhost:35729/livereload.js?snipver=1";
script.async = true;
document.head.appendChild(script);

const app = createApp(App);
app.mount(".listing-body");
