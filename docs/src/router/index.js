import {createRouter, createWebHistory} from "vue-router";

import template from "../layouts/renusify";

const notFound = () => import("../views/index/notFound/index");
/* {{place new import}} */
const pages = () => import("../views/index/pages");
const routes = [
  {
    path: "/",
    component: template,
    children: [
      {
        path: "/",
        name: "base",
        component: pages,
        props: true,
      },
      {
        path: "/:lang?/:path?",
        name: "pages",
        component: pages,
        props: true,
      },
      {path: "/:pathMatch(.*)*", name: "not_found", component: notFound},
    ],
  },
];
const router = createRouter({
  history: createWebHistory(
    process.env.NODE_ENV === "production"
      ? process.env.API_production_URL
      : process.env.API_URL,
  ),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return {behavior: "smooth", left: 0, top: 0};
  },
});
export default router;
