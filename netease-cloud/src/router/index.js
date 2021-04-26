import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        redirect: '/findMusic'
    },

    {
        path: "/findMusic",
        name: "FindMusic",
        // route level code-splitting
        // this generates a separate chunk (findMusic.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "findMusic" */ "../views/find-music.vue"),
    },
    {
        path: "/myMusic",
        name: "myMusic",
        // route level code-splitting
        // this generates a separate chunk (myMusic.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "myMusic" */ "../views/my-music.vue"),
    },
    {
        path: "/friend",
        name: "friend",
        // route level code-splitting
        // this generates a separate chunk (friend.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "friend" */ "../views/friend.vue"),
    },
    {
        path: "/shop",
        name: "shop",
        // route level code-splitting
        // this generates a separate chunk (shop.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "shop" */ "../views/shop.vue"),
    },
    {
        path: "/musicPerson",
        name: "musicPerson",
        // route level code-splitting
        // this generates a separate chunk (musicPerson.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "musicPerson" */ "../views/music-person.vue"),
    }, {
        path: "/download",
        name: "download",
        // route level code-splitting
        // this generates a separate chunk (download.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "download" */ "../views/download.vue"),
    },
];

const router = new VueRouter({
    routes,
});

export default router;
