import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import GamesView from '../views/GamesView.vue';
import AboutView from '../views/AboutView.vue';

const routes = [
    { path: '/', name: 'home', component: HomeView },
    { path: '/games', name: 'games', component: GamesView },
    { path: '/tentang', name: 'tentang', component: AboutView },
];

const router = createRouter({
    history: createWebHashHistory(
        import.meta.env.BASE_URL),
    routes,
    scrollBehavior() {
        return { top: 0 };
    },
});

export default router;