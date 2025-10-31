import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { createHead } from "@vueuse/head";
const vuetify = createVuetify({
  components,
  directives,
});

import AOS from "aos";
import "aos/dist/aos.css";
import jQuery from "jquery";
import "jquery";
window.jQuery = jQuery;
import { createPinia } from "pinia";
import "@mdi/font/css/materialdesignicons.css";
// core version + navigation, pagination modules:
import Swiper from "swiper";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import mitt from "mitt";
const Emitter = mitt();
const head = createHead();
AOS.init();
// init Swiper:
const swiper = new Swiper(".swiper", {
  modules: [Navigation, Pagination, Scrollbar],
});

import { PushNotifications } from "@capacitor/push-notifications";

const registerPush = async () => {
  try {
    let permStatus = await PushNotifications.checkPermissions();
    if (permStatus.receive === "prompt") {
      permStatus = await PushNotifications.requestPermissions();
    }

    if (permStatus.receive !== "granted") {
      console.warn("Permission not granted for push notifications");
      return;
    }

    await PushNotifications.register();

    PushNotifications.addListener("registration", (token) => {
      console.log("Push registration success, token:", token.value);
    });

    PushNotifications.addListener("registrationError", (error) => {
      console.error("Push registration error:", error);
    });

    PushNotifications.addListener(
      "pushNotificationReceived",
      (notification) => {
        console.log("Notification received:", notification);
      }
    );

    PushNotifications.addListener(
      "pushNotificationActionPerformed",
      (notification) => {
        console.log("Notification action performed:", notification);
      }
    );
  } catch (error) {
    console.error("Error initializing push notifications:", error);
  }
};

document.addEventListener("deviceready", registerPush, false);

createApp(App)
  .use(head)
  .use(store)
  .use(createPinia())
  .use(vuetify)
  .provide("Emitter", Emitter)
  .use(swiper)
  .use(router)
  .mount("#app");
