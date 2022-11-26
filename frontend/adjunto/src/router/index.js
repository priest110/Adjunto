import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Homepage.vue"
import Article from "../views/Article.vue"
import Category from "../views/Category.vue"
import Contacts from "../views/Contacts.vue"
import NotFound from "../views/NotFound.vue"

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/categoria/:id",
        name: "Category",
        component: Category
    },
    {
        path: "/artigo/:id",
        name: "Article",
        component: Article
    },
    {
        path: "/contacto",
        name: "Contacts",
        component: Contacts
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