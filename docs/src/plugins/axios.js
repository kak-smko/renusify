import axios from "axios";

// Full config:  https://github.com/axios/axios#request-config
axios.defaults.baseURL = `${
  process.env.NODE_ENV === "production"
    ? process.env.VUE_APP_API_production_URL
    : process.env.VUE_APP_API_URL
}/api`;
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => {
    if (response.data) {
      response.data = window.app.$helper.htmlDecode(response.data);
      if (response.data.msg) {
        window.app.$toast(window.app.$t(response.data.msg));
      }
    }
    return response;
  },
  (error) => {
    const res = error.response;
    if (res && res.status === 307 && res.data.location) {
      console.log("redirect to:" + res.data.location);
      window.location.replace(res.data.location);
    }

    if (res && res.data.msg === "auth.failed") {
      window.app.$toast(window.app.$t("auth.failed"), {
        type: "error",
      });
    } else if (res && res.data.msg) {
      window.app.$toast(window.app.$t(res.data.msg), {
        type: "error",
      });
    }

    return Promise.reject(error);
  }
);
export default {
  install: (app) => {
    app.config.globalProperties.$axios = axios;
  },
};
