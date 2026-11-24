<script setup>
import { computed, ref, watch, onUnmounted } from 'vue';
import { Search, X } from 'lucide-vue-next';
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
  <section>
    <div class="mb-6 flex flex-col gap-4 pb-5 sm:flex-row sm:items-center sm:justify-between">
      <div class="flex flex-wrap items-center gap-1.5">
        <button
          v-for="category in categories"
          :key="category"
          type="button"
          @click="selectedCategory = category"
          :class="[
            'rounded-full px-3.5 py-1.5 text-xs font-medium transition-all',
            selectedCategory === category
              ? 'bg-zinc-900 text-white shadow-2xs'
              : 'bg-zinc-100/90 text-zinc-600 hover:bg-zinc-200/70 hover:text-zinc-900'
          ]"
        >
          {{ category }}
        </button>
      </div>

      <div class="relative w-full sm:w-72">
        <Search class="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cari judul, deskripsi, atau stack..."
          class="w-full rounded-full border border-zinc-200 bg-white py-2 pl-9 pr-8 text-xs text-zinc-900 placeholder:text-zinc-400 transition-colors focus:border-zinc-400 focus:outline-none"
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

    <div v-if="filteredGames.length > 0" class="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <GameCard
        v-for="game in filteredGames"
        :key="game.id"
        :game="game"
        @select="activeGame = $event"
      />
    </div>

    <div v-else class="rounded-2xl border border-dashed border-zinc-200 bg-zinc-50/60 px-6 py-14 text-center">
      <p class="mb-1 text-sm font-medium text-zinc-800">Tidak ada game yang cocok</p>
      <p class="mb-4 text-xs text-zinc-500">Coba kata kunci lain atau kembalikan filter kategori ke Semua.</p>
      <button type="button" @click="resetFilters" class="rounded-full bg-zinc-900 px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-zinc-800">
        Reset Filter
      </button>
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
