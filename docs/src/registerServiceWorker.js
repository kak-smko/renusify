/* eslint-disable no-console */

import {register} from "register-service-worker";

if (process.env.NODE_ENV === "production") {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log(
        "App is being served from cache by a service worker.\n" +
        "For more details, visit https://goo.gl/AFskqB"
      );
    },
    registered() {
      console.log("Service worker has been registered.");
    },
    cached() {
      console.log("Content has been cached for offline use.");
    },
    updatefound() {
      console.log("New content is downloading.");
    },
    updated() {
      console.log("New content is available; please refresh.");
      setTimeout(() => {
        if (window.app) {
          window.app.$toast(window.app.$t("new_content_please_refresh"), {
            type: "info",
            time: -1,
            action: () => {
              window.location.reload(true);
            },
            action_name: window.app.$t("ok"),
            closable: false,
          });
        }
      }, 2000);
    },
    offline() {
      console.log(
        "No internet connection found. App is running in offline mode."
      );
    },
    error(error) {
      console.error("Error during service worker registration:", error);
    },
  });
}
