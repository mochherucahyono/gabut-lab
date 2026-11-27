import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import GameView from '../views/GameView.vue';
import HistoryView from '../views/HistoryView.vue';
import AboutView from '../views/AboutView.vue';

const routes = [
    { path: '/', name: 'home', component: HomeView },
    { path: '/game', name: 'game', component: GameView },
    { path: '/riwayat', name: 'riwayat', component: HistoryView },
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