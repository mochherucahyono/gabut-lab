<script setup>
import { ref, computed, watch } from 'vue';
import { Github, Sparkles, Search, X } from 'lucide-vue-next';
import { gamesList } from './data/games.js';
import GameCard from './components/GameCard.vue';
import GameModal from './components/GameModal.vue';

const selectedCategory = ref('Semua');
const searchQuery = ref('');
const activeGame = ref(null);

const categories = computed(() => {
  const uniqueCategories = new Set(gamesList.map((item) => item.category));
  return ['Semua', ...Array.from(uniqueCategories)];
});

const filteredGames = computed(() => {
  const keyword = searchQuery.value.trim().toLowerCase();

  return gamesList.filter((game) => {
    const matchesCategory =
      selectedCategory.value === 'Semua' || game.category === selectedCategory.value;

    const matchesKeyword =
      !keyword ||
      game.title.toLowerCase().includes(keyword) ||
      game.description.toLowerCase().includes(keyword) ||
      game.tags.some((tag) => tag.toLowerCase().includes(keyword));

    return matchesCategory && matchesKeyword;
  });
});

const resetFilters = () => {
  selectedCategory.value = 'Semua';
  searchQuery.value = '';
};

watch(activeGame, (game) => {
  document.body.style.overflow = game ? 'hidden' : '';
});

</script>

<template>
  <div class="flex min-h-screen flex-col bg-white text-zinc-900">
    <!-- Navbar -->
    <header class="sticky top-0 z-30 border-b border-zinc-100 bg-white/85 backdrop-blur-md">
      <div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <a href="#top" class="flex items-center gap-2 font-semibold tracking-tight text-zinc-900">
          <Sparkles class="h-4 w-4 text-zinc-700" />
          <span>GabutLab</span>
        </a>

        <a
          href="https://github.com/mochherucahyono"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
        >
          <Github class="h-3.5 w-3.5" />
          <span>GitHub</span>
        </a>
      </div>
    </header>

    <!-- Main Content -->
    <main id="top" class="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
      <!-- Hero Section -->
      <section class="mb-10 max-w-2xl">
        <p class="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-400">
          Playground & Eksperimen Kode
        </p>
        <h1 class="mb-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          Kumpulan Karya & Game Iseng.
        </h1>
        <p class="text-base leading-relaxed text-zinc-600">
          Ruang eksperimen pribadi tempat ide-ide spontan diwujudkan menjadi mini-game interaktif. Setiap proyek dilengkapi link demo langsung dan kode sumber di GitHub.
        </p>
      </section>

      <!-- Filter & Search Bar -->
      <section class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex flex-wrap gap-2">
          <button
            v-for="category in categories"
            :key="category"
            type="button"
            @click="selectedCategory = category"
            :class="[
              'rounded-full px-4 py-1.5 text-xs font-medium transition-all',
              selectedCategory === category
                ? 'bg-zinc-900 text-white'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200/70'
            ]"
          >
            {{ category }}
          </button>
        </div>

        <div class="relative w-full sm:w-64">
          <Search class="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari judul atau stack..."
            class="w-full rounded-full border border-zinc-200 bg-white py-1.5 pl-8 pr-8 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none"
          />
          <button
            v-if="searchQuery"
            type="button"
            @click="searchQuery = ''"
            aria-label="Hapus pencarian"
            class="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700"
          >
            <X class="h-3.5 w-3.5" />
          </button>
        </div>
      </section>

      <!-- Game Grid -->
      <section v-if="filteredGames.length > 0" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <GameCard
          v-for="game in filteredGames"
          :key="game.id"
          :game="game"
          @select="activeGame = $event"
        />
      </section>

      <!-- Empty State -->
      <section
        v-else
        class="rounded-2xl border border-dashed border-zinc-200 bg-zinc-50/60 px-6 py-14 text-center"
      >
        <p class="mb-1 text-sm font-medium text-zinc-800">Tidak ada game yang cocok</p>
        <p class="mb-4 text-xs text-zinc-500">
          Coba kata kunci lain atau kembalikan filter kategori ke Semua.
        </p>
        <button
          type="button"
          @click="resetFilters"
          class="rounded-full bg-zinc-900 px-4 py-1.5 text-xs font-medium text-white hover:bg-zinc-800"
        >
          Reset Filter
        </button>
      </section>
    </main>

    <!-- Footer -->
    <footer class="border-t border-zinc-100 py-8 text-center text-xs text-zinc-500">
      © 2026 GabutLab. Dibuat oleh Heru Cahyono.
    </footer>

    <!-- Modal Detail -->
    <GameModal
      v-if="activeGame"
      :game="activeGame"
      @close="activeGame = null"
    />
  </div>
</template>