import { ref, computed } from 'vue';
import { gamesList } from '../data/games.js';

const STORAGE_KEY = 'gabutlab:library:v1';
const STORAGE_VERSION = 1;
const MAX_HISTORY_ITEMS = 10;

// Peta ID game valid dari games.js untuk validasi & sinkronisasi metadata
const validGamesMap = new Map(gamesList.map((game) => [game.id, game]));

const favorites = ref([]);
const history = ref([]);
let isInitialized = false;

function sanitizeFavorites(rawFavorites) {
    if (!Array.isArray(rawFavorites)) return [];
    const seen = new Set();
    const clean = [];

    for (const id of rawFavorites) {
        if (validGamesMap.has(id) && !seen.has(id)) {
            seen.add(id);
            clean.push(id);
        }
    }
    return clean;
}

function sanitizeHistory(rawHistory) {
    if (!Array.isArray(rawHistory)) return [];
    const seen = new Set();
    const clean = [];

    for (const item of rawHistory) {
        if (!item || typeof item !== 'object') continue;
        const validGame = validGamesMap.get(item.id);
        if (!validGame || seen.has(validGame.id)) continue;

        const visitedAt =
            typeof item.visitedAt === 'string' && !Number.isNaN(Date.parse(item.visitedAt)) ?
            item.visitedAt :
            new Date().toISOString();

        seen.add(validGame.id);
        clean.push({
            id: validGame.id,
            title: validGame.title,
            demoUrl: validGame.demoUrl,
            thumbnail: validGame.thumbnail,
            category: validGame.category,
            visitedAt,
        });

        if (clean.length >= MAX_HISTORY_ITEMS) break;
    }

    return clean;
}

function loadFromStorage() {
    if (typeof window === 'undefined') return;
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return;

        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== 'object') return;

        // Cek versi skema untuk kesiapan migrasi ke depan
        if (parsed.version !== STORAGE_VERSION) {
            favorites.value = sanitizeFavorites(parsed.favorites);
            history.value = sanitizeHistory(parsed.history);
            saveToStorage();
            return;
        }

        favorites.value = sanitizeFavorites(parsed.favorites);
        history.value = sanitizeHistory(parsed.history);
    } catch {
        // Jika JSON rusak atau localStorage diblokir, reset ke state aman
        favorites.value = [];
        history.value = [];
    }
}

function saveToStorage() {
    if (typeof window === 'undefined') return;
    try {
        const payload = {
            version: STORAGE_VERSION,
            favorites: sanitizeFavorites(favorites.value),
            history: sanitizeHistory(history.value),
        };
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
        // Abaikan kegagalan quota/private mode agar aplikasi tidak crash
    }
}

function ensureInitialized() {
    if (!isInitialized) {
        loadFromStorage();
        isInitialized = true;
    }
}

export function formatRelativeTime(isoString) {
    const timestamp = Date.parse(isoString);
    if (Number.isNaN(timestamp)) return 'Baru saja';

    const diffSeconds = Math.floor((Date.now() - timestamp) / 1000);
    if (diffSeconds < 60) return 'Baru saja';

    const diffMinutes = Math.floor(diffSeconds / 60);
    if (diffMinutes < 60) return `${diffMinutes} menit lalu`;

    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours} jam lalu`;

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays} hari lalu`;

    return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(timestamp));
}

export function useGameLibrary() {
    ensureInitialized();

    const favoriteIdsSet = computed(() => new Set(favorites.value));
    const favoriteCount = computed(() => favorites.value.length);
    const historyCount = computed(() => history.value.length);

    const isFavorite = (gameId) => favoriteIdsSet.value.has(gameId);

    const toggleFavorite = (gameId) => {
        if (!validGamesMap.has(gameId)) return;

        if (favoriteIdsSet.value.has(gameId)) {
            favorites.value = favorites.value.filter((id) => id !== gameId);
        } else {
            favorites.value = [gameId, ...favorites.value];
        }
        saveToStorage();
    };

    const recordPlay = (gameOrId) => {
        const gameId = typeof gameOrId === 'object' && gameOrId !== null ? gameOrId.id : gameOrId;
        const validGame = validGamesMap.get(gameId);
        if (!validGame) return;

        const entry = {
            id: validGame.id,
            title: validGame.title,
            demoUrl: validGame.demoUrl,
            thumbnail: validGame.thumbnail,
            category: validGame.category,
            visitedAt: new Date().toISOString(),
        };

        const filtered = history.value.filter((item) => item.id !== validGame.id);
        history.value = [entry, ...filtered].slice(0, MAX_HISTORY_ITEMS);
        saveToStorage();
    };

    const removeHistoryItem = (gameId) => {
        history.value = history.value.filter((item) => item.id !== gameId);
        saveToStorage();
    };

    const clearHistory = () => {
        history.value = [];
        saveToStorage();
    };

    return {
        favorites,
        history,
        favoriteCount,
        historyCount,
        isFavorite,
        toggleFavorite,
        recordPlay,
        removeHistoryItem,
        clearHistory,
        formatRelativeTime,
    };
}