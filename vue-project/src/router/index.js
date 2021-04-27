import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Login",
        redirect: '/Login',

    },
    {
        path: "/login",
        name: "Login",

        component: Login
    },
    {
        path: "/home",
        name: "Home",
        component: () =>
            import("../views/Home.vue"),
        children: [
            {
                path: "first",
                component: () =>
                    import("../views/first.vue"),
            }
        ]
    },
    {
        path: "*",
        component: () =>
            import("../views/404.vue"),

    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
