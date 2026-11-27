<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import {
  History,
  Play,
  Trash2,
  Heart,
  Clock,
  ArrowRight,
  Gamepad2,
} from 'lucide-vue-next';
import { useGameLibrary } from '../composables/useGameLibrary.js';

const {
  history,
  historyCount,
  isFavorite,
  toggleFavorite,
  recordPlay,
  removeHistoryItem,
  clearHistory,
  formatRelativeTime,
} = useGameLibrary();

const brokenImages = ref({});

const handleImgError = (id) => {
  brokenImages.value[id] = true;
};

const handleClearAll = () => {
  if (historyCount.value === 0) return;
  const confirmed = window.confirm(
    'Hapus semua riwayat bermain? Tindakan ini tidak dapat dibatalkan.'
  );
  if (confirmed) {
    clearHistory();
  }
};
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
    <!-- Header Section -->
    <section class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div
          class="mb-2.5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/70 px-3 py-1 text-xs font-medium text-emerald-700"
        >
          <History class="h-3.5 w-3.5" />
          <span>Maksimal 10 game terakhir</span>
        </div>
        <h1 class="text-3xl font-bold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
          Riwayat Bermain
        </h1>
        <p class="mt-1 text-base leading-relaxed text-zinc-600 sm:text-lg lg:text-xl">
          Daftar game yang baru saja kamu buka tautan demonya di perangkat ini.
        </p>
      </div>

      <button
        v-if="historyCount > 0"
        type="button"
        @click="handleClearAll"
        aria-label="Hapus semua riwayat bermain"
        class="inline-flex items-center gap-1.5 self-start rounded-full border border-red-200 bg-red-50/70 px-4 py-2 text-xs font-medium text-red-600 transition-colors hover:bg-red-100 active:scale-95 sm:self-auto"
      >
        <Trash2 class="h-3.5 w-3.5" />
        <span>Hapus semua riwayat</span>
      </button>
    </section>

    <!-- History List -->
    <section v-if="historyCount > 0" class="space-y-3.5">
      <article
        v-for="(item, index) in history"
        :key="item.id"
        class="group flex flex-col justify-between gap-4 rounded-3xl border border-zinc-200/90 bg-white p-4 transition-all hover:border-blue-300 hover:shadow-sm sm:flex-row sm:items-center"
      >
        <div class="flex items-center gap-4">
          <!-- Thumbnail -->
          <div
            class="relative h-16 w-24 shrink-0 overflow-hidden rounded-2xl border border-zinc-100 bg-zinc-100 sm:h-20 sm:w-32"
          >
            <img
              v-if="!brokenImages[item.id]"
              :src="item.thumbnail"
              :alt="item.title"
              @error="handleImgError(item.id)"
              class="h-full w-full object-cover"
            />
            <div
              v-else
              class="flex h-full w-full items-center justify-center bg-zinc-100 text-zinc-400"
            >
              <Gamepad2 class="h-6 w-6" />
            </div>

            <span
              v-if="index === 0"
              class="absolute left-1.5 top-1.5 rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-semibold text-zinc-950 shadow-2xs"
            >
              Terakhir
            </span>
          </div>

          <!-- Info -->
          <div class="min-w-0">
            <div class="mb-1 flex flex-wrap items-center gap-2">
              <span
                class="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 text-[11px] font-medium text-zinc-600"
              >
                {{ item.category }}
              </span>
              <span class="inline-flex items-center gap-1 text-xs text-zinc-500">
                <Clock class="h-3 w-3" />
                {{ formatRelativeTime(item.visitedAt) }}
              </span>
            </div>

            <h2 class="truncate text-base font-semibold tracking-tight text-zinc-900">
              {{ item.title }}
            </h2>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center justify-end gap-2 border-t border-zinc-100 pt-3 sm:border-t-0 sm:pt-0">
          <!-- Favorite Sync Button -->
          <button
            type="button"
            @click="toggleFavorite(item.id)"
            :aria-label="
              isFavorite(item.id)
                ? `Hapus ${item.title} dari favorit`
                : `Tambahkan ${item.title} ke favorit`
            "
            :aria-pressed="isFavorite(item.id)"
            :title="isFavorite(item.id) ? 'Hapus dari favorit' : 'Simpan ke favorit'"
            :class="[
              'inline-flex h-9 w-9 items-center justify-center rounded-full border transition-all active:scale-90',
              isFavorite(item.id)
                ? 'border-red-200 bg-red-50 text-red-500 hover:bg-red-100'
                : 'border-zinc-200 bg-white text-zinc-500 hover:border-red-200 hover:text-red-500',
            ]"
          >
            <Heart :class="['h-4 w-4', isFavorite(item.id) ? 'fill-current' : '']" />
          </button>

          <!-- Remove Single Item -->
          <button
            type="button"
            @click="removeHistoryItem(item.id)"
            :aria-label="`Hapus ${item.title} dari riwayat`"
            title="Hapus dari riwayat"
            class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 active:scale-90"
          >
            <Trash2 class="h-4 w-4" />
          </button>

          <!-- Play Again -->
          <a
            :href="item.demoUrl"
            target="_blank"
            rel="noopener noreferrer"
            @click="recordPlay(item.id)"
            :aria-label="`Mainkan lagi ${item.title} di tab baru`"
            class="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-4 py-2 text-xs font-medium text-white shadow-2xs transition-all hover:bg-blue-700 active:scale-95"
          >
            <Play class="h-3.5 w-3.5 fill-current" />
            <span>Mainkan Lagi</span>
          </a>
        </div>
      </article>
    </section>

    <!-- Empty State -->
    <section
      v-else
      class="rounded-3xl border border-dashed border-zinc-200 bg-zinc-50/70 px-6 py-16 text-center"
    >
      <div
        class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 shadow-2xs"
      >
        <History class="h-5 w-5" />
      </div>
      <h2 class="mb-1 text-base font-semibold text-zinc-900">Belum ada riwayat bermain</h2>
      <p class="mx-auto mb-5 max-w-md text-xs leading-relaxed text-zinc-500">
        Setiap kali kamu membuka demo game, catatannya akan muncul otomatis di halaman ini agar mudah dimainkan kembali.
      </p>
      <RouterLink
        to="/game"
        class="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-5 py-2.5 text-xs font-medium text-white transition-colors hover:bg-blue-700"
      >
        <span>Jelajahi Game</span>
        <ArrowRight class="h-3.5 w-3.5" />
      </RouterLink>
    </section>
  </div>
</template>