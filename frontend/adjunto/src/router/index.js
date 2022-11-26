import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Homepage.vue"
import Artigo from "../views/Artigo.vue"
import Categoria from "../views/Categoria.vue"
import Contacto from "../views/Contacto.vue"
import NotFound from "../views/NotFound.vue"

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/categoria/:id",
        name: "Categoria",
        component: Categoria
    },
    {
        path: "/artigo/:id",
        name: "Artigo",
        component: Artigo
    },
    {
        path: "/contacto",
        name: "Contacto",
        component: Contacto
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router