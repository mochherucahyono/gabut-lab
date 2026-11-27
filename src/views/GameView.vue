<script setup>
import { ref, computed, watch, onUnmounted } from 'vue';
import { RouterLink } from 'vue-router';
import { Search, X, Heart, History, Sparkles } from 'lucide-vue-next';
import { gamesList } from '../data/games.js';
import { useGameLibrary } from '../composables/useGameLibrary.js';
import { isSafeExternalUrl } from '../utils/urlValidator.js';
import GameCard from '../components/GameCard.vue';
import GameModal from '../components/GameModal.vue';
import GameEmbedModal from '../components/GameEmbedModal.vue';

const { isFavorite, favoriteCount, historyCount, recordPlay } = useGameLibrary();

const collectionTab = ref('all'); // 'all' | 'favorites'
const selectedCategory = ref('Semua');
const searchQuery = ref('');
const activeGame = ref(null);
const activeEmbedGame = ref(null);

const categories = computed(() => {
  const uniqueCategories = new Set(gamesList.map((item) => item.category));
  return ['Semua', ...Array.from(uniqueCategories)];
});

const filteredGames = computed(() => {
  const keyword = searchQuery.value.trim().toLowerCase();

  return gamesList.filter((game) => {
    const matchesTab = collectionTab.value === 'all' || isFavorite(game.id);

    const matchesCategory =
      selectedCategory.value === 'Semua' || game.category === selectedCategory.value;

    const matchesKeyword =
      !keyword ||
      game.title.toLowerCase().includes(keyword) ||
      game.description.toLowerCase().includes(keyword) ||
      game.tags.some((tag) => tag.toLowerCase().includes(keyword));

    return matchesTab && matchesCategory && matchesKeyword;
  });
});

const isEmptyFavoritesOnly = computed(
  () =>
    collectionTab.value === 'favorites' &&
    favoriteCount.value === 0 &&
    selectedCategory.value === 'Semua' &&
    !searchQuery.value.trim()
);

const resetFilters = () => {
  collectionTab.value = 'all';
  selectedCategory.value = 'Semua';
  searchQuery.value = '';
};

const openDetailModal = (game) => {
  activeEmbedGame.value = null;
  activeGame.value = game;
};

const closeDetailModal = () => {
  activeGame.value = null;
};

const openEmbedModal = (game) => {
  if (!game || !isSafeExternalUrl(game.demoUrl)) return;
  activeGame.value = null;
  activeEmbedGame.value = game;
  recordPlay(game);
};

const closeEmbedModal = () => {
  activeEmbedGame.value = null;
};

watch([activeGame, activeEmbedGame], ([detailModal, embedModal]) => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = detailModal || embedModal ? 'hidden' : '';
  }
});

onUnmounted(() => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = '';
  }
});
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
    <!-- Header Section -->
    <section class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div
          class="mb-2.5 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-600"
        >
          <span class="flex items-center gap-1">
            <span class="h-2 w-2 rounded-full bg-blue-500" />
            <span class="h-2 w-2 rounded-full bg-rose-500" />
            <span class="h-2 w-2 rounded-full bg-amber-400" />
            <span class="h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span>Katalog Eksperimen</span>
        </div>
        <h1 class="text-3xl font-bold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
          Koleksi Mini-Game
        </h1>
        <p class="mt-1 text-base leading-relaxed text-zinc-600 sm:text-lg lg:text-xl">
          Mainkan game langsung di layar embed atau buka di tab baru, simpan favoritmu, dan lihat riwayat bermain.
        </p>
      </div>

      <!-- Quick Link ke Riwayat -->
      <RouterLink
        to="/riwayat"
        class="inline-flex items-center gap-2 self-start rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-medium text-zinc-700 shadow-2xs transition-all hover:border-emerald-300 hover:bg-emerald-50/50 hover:text-emerald-700 sm:self-auto"
      >
        <History class="h-3.5 w-3.5 text-emerald-600" />
        <span>Riwayat</span>
        <span
          v-if="historyCount > 0"
          class="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-700"
        >
          {{ historyCount }}
        </span>
      </RouterLink>
    </section>

    <!-- Toolbar: Semua / Favorit + Kategori + Pencarian -->
    <section class="mb-8 space-y-4 rounded-3xl border border-zinc-200/80 bg-zinc-50/60 p-4 sm:p-5">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <!-- Segmented Switch: Semua / Favorit -->
        <div
          role="tablist"
          aria-label="Filter koleksi game"
          class="inline-flex rounded-full border border-zinc-200 bg-white p-1"
        >
          <button
            type="button"
            role="tab"
            :aria-selected="collectionTab === 'all'"
            @click="collectionTab = 'all'"
            :class="[
              'inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition-all',
              collectionTab === 'all'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'text-zinc-600 hover:text-zinc-900'
            ]"
          >
            <Sparkles class="h-3.5 w-3.5" />
            <span>Semua ({{ gamesList.length }})</span>
          </button>

          <button
            type="button"
            role="tab"
            :aria-selected="collectionTab === 'favorites'"
            @click="collectionTab = 'favorites'"
            :class="[
              'inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition-all',
              collectionTab === 'favorites'
                ? 'bg-rose-500 text-white shadow-2xs'
                : 'text-zinc-600 hover:text-zinc-900'
            ]"
          >
            <Heart :class="['h-3.5 w-3.5', collectionTab === 'favorites' ? 'fill-current' : '']" />
            <span>Favorit ({{ favoriteCount }})</span>
          </button>
        </div>

        <!-- Search Box -->
        <div class="relative w-full sm:w-72">
          <Search
            class="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400"
          />
          <input
            v-model="searchQuery"
            type="text"
            aria-label="Cari judul, deskripsi, atau stack"
            placeholder="Cari judul, deskripsi, atau stack..."
            class="w-full rounded-full border border-zinc-200 bg-white py-2 pl-9 pr-8 text-xs text-zinc-900 placeholder:text-zinc-400 transition-colors focus:border-blue-400 focus:outline-none"
          />
          <button
            v-if="searchQuery"
            type="button"
            @click="searchQuery = ''"
            aria-label="Hapus pencarian"
            class="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
          >
            <X class="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <!-- Category Pills -->
      <div class="flex flex-wrap items-center gap-1.5 pt-1">
        <button
          v-for="category in categories"
          :key="category"
          type="button"
          @click="selectedCategory = category"
          :class="[
            'rounded-full px-3.5 py-1.5 text-xs font-medium transition-all',
            selectedCategory === category
              ? 'bg-zinc-900 text-white shadow-2xs'
              : 'border border-zinc-200/80 bg-white text-zinc-600 hover:border-zinc-300 hover:text-zinc-900'
          ]"
        >
          {{ category }}
        </button>
      </div>
    </section>

    <!-- Game Grid -->
    <section
      v-if="filteredGames.length > 0"
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      <GameCard
        v-for="game in filteredGames"
        :key="game.id"
        :game="game"
        @select="openDetailModal"
        @play="openEmbedModal"
      />
    </section>

    <!-- Empty State: Belum Ada Favorit -->
    <section
      v-else-if="isEmptyFavoritesOnly"
      class="rounded-3xl border border-dashed border-rose-200 bg-rose-50/40 px-6 py-16 text-center"
    >
      <div
        class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-rose-200 bg-white text-rose-500 shadow-2xs"
      >
        <Heart class="h-5 w-5" />
      </div>
      <h2 class="mb-1 text-base font-semibold text-zinc-900">Belum ada game favorit</h2>
      <p class="mx-auto mb-5 max-w-md text-xs leading-relaxed text-zinc-600">
        Klik ikon hati pada kartu atau detail game yang kamu suka untuk menyimpannya di daftar favoritmu.
      </p>
      <button
        type="button"
        @click="collectionTab = 'all'"
        class="rounded-full bg-blue-600 px-5 py-2 text-xs font-medium text-white transition-colors hover:bg-blue-700"
      >
        Lihat Semua Game
      </button>
    </section>

    <!-- Empty State: Filter / Pencarian Kosong -->
    <section
      v-else
      class="rounded-3xl border border-dashed border-zinc-200 bg-zinc-50/60 px-6 py-16 text-center"
    >
      <h2 class="mb-1 text-base font-semibold text-zinc-900">Tidak ada game yang cocok</h2>
      <p class="mb-5 text-xs text-zinc-500">
        Coba ubah kata kunci pencarian, kategori, atau kembali ke daftar semua game.
      </p>
      <button
        type="button"
        @click="resetFilters"
        class="rounded-full bg-zinc-900 px-5 py-2 text-xs font-medium text-white transition-colors hover:bg-zinc-800"
      >
        Reset Filter
      </button>
    </section>

    <!-- Detail Modal -->
    <GameModal
      v-if="activeGame"
      :game="activeGame"
      @close="closeDetailModal"
      @play="openEmbedModal"
    />

    <!-- Embed Modal -->
    <GameEmbedModal
      v-if="activeEmbedGame"
      :game="activeEmbedGame"
      @close="closeEmbedModal"
    />
  </div>
</template>