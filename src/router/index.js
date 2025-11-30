import { createRouter, createWebHistory } from 'vue-router'
import QuizzView from '@/view/QuizzView.vue'
import ResponseView from '@/view/ResponseView.vue'
import HomeView from '@/view/HomeView.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/quizz',
        name: 'Quizz',
        component: QuizzView
    },
    {
        path: '/responses',
        name: 'Responses',
        component: ResponseView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
