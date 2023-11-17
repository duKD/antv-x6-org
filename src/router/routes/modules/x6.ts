import { DEFAULT_LAYOUT } from "../base";
import { AppRouteRecordRaw } from "../types";

const X6: AppRouteRecordRaw = {
  path: "/x6",
  name: "table",
  component: DEFAULT_LAYOUT,
  redirect: "/x6/index",
  meta: {
    locale: "x6文档",
    icon: "icon-settings",
    requiresAuth: true,
    order: 3,
  },
  children: [
    {
      path: "/x6/index",
      name: "demo",
      component: () => import("@/views/x6/index.vue"),
      meta: {
        locale: "demo",
        requiresAuth: true,
        roles: ["admin"],
      },
    },
  ],
};

export default X6;
