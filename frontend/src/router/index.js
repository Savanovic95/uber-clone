import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView.vue";
import LandingView from "@/views/LandingView.vue";
import axios from "axios";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/home',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/',
            name: 'login',
            component: LoginView,
        },
        {
            path: '/landing',
            name: 'landing',
            component: LandingView,
        }
    ]
})

router.beforeEach((to, from) => {

    if (to.name === 'login') {
        return true;
    }
    console.log(localStorage)
    if (!localStorage.getItem('token')) {
        return {
            name: 'login'
        }
    }
    checkTokenAuthenticity();
});

const checkTokenAuthenticity = () => {
    axios.get('http://127.0.0.1:8000/api/user', {
        headers: {
            Authorization: `Bearer${localStorage.getItem('token')}`
        }
    })
        .then((response) => {
        })
        .catch((error) => {
            localStorage.removeItem('token')
            router.push({
                name: 'login'
            })
        })
}


export default router
