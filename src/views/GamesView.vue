<script setup>
import { computed, ref, watch, onUnmounted } from 'vue';
import { Search, X, Sparkles, RotateCcw } from 'lucide-vue-next';
import GameCard from '../components/GameCard.vue';
import GameModal from '../components/GameModal.vue';
import { gamesList } from '../data/games.js';

const selectedCategory = ref('Semua');
const searchQuery = ref('');
const activeGame = ref(null);

const categories = computed(() => ['Semua', ...new Set(gamesList.map((game) => game.category))]);

const filteredGames = computed(() => {
  const keyword = searchQuery.value.trim().toLowerCase();

  return gamesList.filter((game) => {
    const matchesCategory = selectedCategory.value === 'Semua' || game.category === selectedCategory.value;
    const matchesKeyword = !keyword ||
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

onUnmounted(() => {
  document.body.style.overflow = '';
});
</script>

<template>
  <section class="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
    <!-- Header Ringkas Bergaya Doodle -->
    <div class="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <div class="mb-2 inline-flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white px-3.5 py-1 text-xs font-medium text-zinc-600 shadow-2xs">
          <Sparkles class="h-3.5 w-3.5 text-amber-500" />
          <span>Koleksi gabut.lab</span>
        </div>
        <h2 class="text-2xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          Eksplorasi
          <span class="relative inline-block">
            Mini-Game & Karya
            <span class="absolute -bottom-1 left-0 h-1.5 w-full rounded-full bg-blue-200/90" />
          </span>
        </h2>
      </div>

      <div class="inline-flex items-center gap-2 self-start rounded-full border border-zinc-200/80 bg-white px-4 py-2 text-xs font-medium text-zinc-600 shadow-2xs sm:self-auto sm:text-sm">
        <span class="h-2.5 w-2.5 rounded-full bg-emerald-500" />
        <span>Menampilkan <strong class="font-bold text-zinc-900">{{ filteredGames.length }}</strong> dari {{ gamesList.length }} karya</span>
      </div>
    </div>

    <!-- Bar Filter Kategori & Pencarian (Lebih Besar & Lega) -->
    <div class="mb-9 flex flex-col gap-4 rounded-3xl border border-zinc-200/80 bg-white p-3.5 shadow-[0_4px_24px_-10px_rgba(0,0,0,0.07)] lg:flex-row lg:items-center lg:justify-between lg:rounded-full lg:px-4 lg:py-3">
      <!-- Pill Kategori -->
      <div class="flex flex-wrap items-center gap-2">
        <button
          v-for="category in categories"
          :key="category"
          type="button"
          @click="selectedCategory = category"
          :class="[
            'rounded-full px-4 py-2 text-xs font-semibold transition-all active:scale-95 sm:text-sm',
            selectedCategory === category
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-zinc-100/90 text-zinc-600 hover:bg-zinc-200/75 hover:text-zinc-900'
          ]"
        >
          {{ category }}
        </button>
      </div>

      <!-- Search Input Bergaya Google Search -->
      <div class="relative w-full lg:w-80">
        <Search class="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cari judul, deskripsi, atau stack..."
          class="w-full rounded-full border border-zinc-200 bg-zinc-50/70 py-2.5 pl-10 pr-9 text-sm text-zinc-900 placeholder:text-zinc-400 transition-all focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
        />
        <button
          v-if="searchQuery"
          type="button"
          @click="searchQuery = ''"
          aria-label="Hapus pencarian"
          class="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-zinc-400 transition-colors hover:bg-zinc-200/70 hover:text-zinc-700"
        >
          <X class="h-4 w-4" />
        </button>
      </div>
    </div>

    <!-- Grid Kartu Game -->
    <div v-if="filteredGames.length > 0" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <GameCard
        v-for="game in filteredGames"
        :key="game.id"
        :game="game"
        @select="activeGame = $event"
      />
    </div>

    <!-- Empty State Bergaya Doodle -->
    <div
      v-else
      class="relative overflow-hidden rounded-[2rem] border border-zinc-200/80 bg-white px-6 py-16 text-center shadow-[0_6px_30px_-10px_rgba(0,0,0,0.07)]"
    >
      <div class="pointer-events-none absolute -left-5 top-6 h-16 w-16 rounded-full bg-amber-100/80" />
      <div class="pointer-events-none absolute right-8 bottom-6 h-16 w-16 rounded-2xl bg-rose-100/75" />

      <div class="relative z-10 mx-auto max-w-md">
        <div class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-500 ring-1 ring-amber-200/70">
          <Search class="h-7 w-7" />
        </div>
        <p class="mb-1.5 text-lg font-bold text-zinc-900 sm:text-xl">Tidak ada karya yang cocok</p>
        <p class="mb-6 text-sm leading-relaxed text-zinc-600 sm:text-base">
          Coba kata kunci lain atau kembalikan filter kategori ke <strong class="font-semibold text-zinc-800">Semua</strong>.
        </p>
        <button
          type="button"
          @click="resetFilters"
          class="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-xs transition-all hover:bg-blue-700 active:scale-95"
        >
          <RotateCcw class="h-4 w-4" />
          <span>Reset Filter</span>
        </button>
      </div>
    </div>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <GameModal v-if="activeGame" :game="activeGame" @close="activeGame = null" />
    </Transition>
  </section>
</template>