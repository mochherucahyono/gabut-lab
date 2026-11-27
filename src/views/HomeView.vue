<script setup>
import { ref } from 'vue';
import { Play, Code2, Sparkles, Gamepad2, Terminal } from 'lucide-vue-next';
import { gamesList } from '../data/games.js';

const categoryCount = new Set(gamesList.map((game) => game.category)).size;

// Interaktivitas kecil khas Google Doodle saat elemen di header diklik
const activeSpark = ref(false);
const doodleScore = ref(0);

const triggerDoodle = () => {
  activeSpark.value = true;
  doodleScore.value += 1;
  setTimeout(() => {
    activeSpark.value = false;
  }, 500);
};
</script>

<template>
  <section class="mx-auto mb-20 max-w-6xl px-4 pt-8 text-center sm:px-6 sm:pt-12">
    <!-- Kanvas Utama Ala Google Doodle (Diperbesar & Lebih Lega) -->
    <div
      @click="triggerDoodle"
      title="Klik untuk interaksi doodle!"
      class="group relative mx-auto mb-9 flex h-56 w-full max-w-3xl cursor-pointer select-none items-center justify-center overflow-hidden rounded-[2rem] border border-zinc-200/80 bg-white px-6 shadow-[0_6px_30px_-8px_rgba(0,0,0,0.08)] transition-all duration-300 hover:border-zinc-300 hover:shadow-[0_14px_40px_-10px_rgba(0,0,0,0.12)] sm:h-64 sm:px-10"
    >
      <!-- Elemen Dekorasi Latar Halus (Floating Shapes Lebih Besar) -->
      <div
        class="pointer-events-none absolute -left-6 top-7 h-20 w-20 rounded-full bg-amber-100/80 transition-transform duration-500 group-hover:translate-x-2 group-hover:scale-110 sm:h-24 sm:w-24"
      />
      <div
        class="pointer-events-none absolute right-10 top-6 h-11 w-11 rotate-12 rounded-2xl bg-sky-100/85 transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110 sm:h-14 sm:w-14"
      />
      <div
        class="pointer-events-none absolute bottom-6 left-16 h-10 w-10 rounded-full bg-emerald-100/85 transition-transform duration-500 group-hover:-translate-y-1.5 sm:h-12 sm:w-12"
      />
      <div
        class="pointer-events-none absolute -bottom-4 right-14 h-20 w-20 rounded-3xl bg-rose-100/70 transition-transform duration-500 group-hover:-translate-y-2 sm:h-24 sm:w-24"
      />

      <!-- Ilustrasi + Tipografi Terintegrasi (Doodle Style Diperbesar) -->
      <div class="relative z-10 flex flex-col items-center">
        <div class="flex items-center gap-3 sm:gap-5">
          <!-- Ikon Kiri: Gamepad -->
          <div
            :class="activeSpark ? '-rotate-12 scale-110' : 'group-hover:-rotate-6'"
            class="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-xs transition-all duration-300 sm:h-16 sm:w-16 sm:rounded-3xl"
          >
            <Gamepad2 class="h-8 w-8 sm:h-9 sm:w-9" />
          </div>

          <!-- Wordmark Kreatif "heru.lab" dengan Ritme Warna Google Doodle -->
          <div class="flex items-baseline text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            <span class="text-blue-500 transition-transform duration-200 group-hover:-translate-y-1">g</span>
            <span class="text-rose-500 transition-transform duration-200 delay-75 group-hover:translate-y-1">a</span>
            <span class="text-amber-500 transition-transform duration-200 delay-100 group-hover:-translate-y-1">b</span>
            <span class="text-blue-500 transition-transform duration-200 delay-150 group-hover:translate-y-1">u</span>
            <span class="text-emerald-500 transition-transform duration-200 delay-200 group-hover:-translate-y-1">t</span>
            <span class="mx-1 text-rose-500">.</span>
            <span class="text-blue-500 transition-transform duration-200 group-hover:-translate-y-1">l</span>
            <span class="text-amber-500 transition-transform duration-200 delay-75 group-hover:translate-y-1">a</span>
            <span class="text-emerald-500 transition-transform duration-200 delay-100 group-hover:-translate-y-1">b</span>
          </div>

          <!-- Ikon Kanan: Terminal Kode -->
          <div
            :class="activeSpark ? 'rotate-12 scale-110' : 'group-hover:rotate-6'"
            class="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 shadow-xs transition-all duration-300 sm:h-16 sm:w-16 sm:rounded-3xl"
          >
            <Terminal class="h-8 w-8 sm:h-9 sm:w-9" />
          </div>
        </div>

        <!-- Sub-label di dalam kanvas doodle -->
        <div class="mt-4 inline-flex items-center gap-2 rounded-full bg-zinc-50 px-4 py-1.5 text-xs font-medium text-zinc-600 ring-1 ring-zinc-200/80 sm:text-sm">
          <Sparkles class="h-4 w-4 text-amber-500" />
          <span v-if="doodleScore === 0">Ruang eksperimen terbuka · klik doodle</span>
          <span v-else class="font-semibold text-zinc-800">Combo eksperimen: +{{ doodleScore }} ✨</span>
        </div>
      </div>
    </div>

    <!-- Headline Utama (Diperbesar) -->
    <h1 class="mx-auto mb-5 max-w-4xl text-3xl font-bold tracking-tight text-zinc-900 sm:text-5xl sm:leading-[1.15] lg:text-6xl">
      Ide iseng yang berubah jadi
      <span class="relative inline-block text-zinc-900">
        mini-game & karya gabut.
        <span class="absolute -bottom-1.5 left-0 h-2 w-full rounded-full bg-amber-300/75 sm:h-2.5" />
      </span>
    </h1>

    <!-- Deskripsi (Diperbesar agar lebih mudah dibaca) -->
    <p class="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg lg:text-xl">
      Saya <strong class="font-semibold text-zinc-900">Heru</strong> — di sini saya merangkum mini-game serta eksperimen kode yang lahir dari rasa penasaran dan waktu luang. Setiap karya bisa langsung dimainkan di browser dan dibedah kode sumbernya di GitHub.
    </p>

    <!-- Tombol Aksi (Diperbesar) -->
    <div class="mb-10 flex flex-wrap items-center justify-center gap-4">
      <RouterLink
        to="/game"
        class="inline-flex items-center gap-2.5 rounded-full bg-blue-600 px-7 py-3.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md active:scale-95 sm:text-base"
      >
        <Play class="h-4 w-4 fill-current sm:h-5 sm:w-5" />
        <span>Mainkan Karya</span>
      </RouterLink>

      <RouterLink
        to="/tentang"
        class="inline-flex items-center gap-2.5 rounded-full border border-zinc-200 bg-zinc-50/90 px-7 py-3.5 text-sm font-medium text-zinc-700 transition-all hover:border-zinc-300 hover:bg-zinc-100 active:scale-95 sm:text-base"
      >
        <Code2 class="h-4 w-4 text-zinc-500 sm:h-5 sm:w-5" />
        <span>Tentang Proyek</span>
      </RouterLink>
    </div>

    <!-- Statistik dalam Bentuk Pill Horizontal (Diperbesar) -->
    <div class="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
      <div class="inline-flex items-center gap-2.5 rounded-full border border-zinc-200/90 bg-white px-5 py-2.5 text-sm text-zinc-600 shadow-2xs">
        <span class="h-2.5 w-2.5 rounded-full bg-blue-500" />
        <strong class="text-base font-bold text-zinc-900">{{ gamesList.length }}</strong>
        <span>Karya & Eksperimen</span>
      </div>

      <div class="inline-flex items-center gap-2.5 rounded-full border border-zinc-200/90 bg-white px-5 py-2.5 text-sm text-zinc-600 shadow-2xs">
        <span class="h-2.5 w-2.5 rounded-full bg-amber-500" />
        <strong class="text-base font-bold text-zinc-900">{{ categoryCount }}</strong>
        <span>Kategori Genre</span>
      </div>

      <div class="inline-flex items-center gap-2.5 rounded-full border border-zinc-200/90 bg-white px-5 py-2.5 text-sm text-zinc-600 shadow-2xs">
        <span class="h-2.5 w-2.5 rounded-full bg-emerald-500" />
        <strong class="text-base font-bold text-zinc-900">100%</strong>
        <span>Demo & Kode Terbuka</span>
      </div>
    </div>
  </section>
</template>