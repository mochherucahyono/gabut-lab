<script setup>
import { Play, Code2 } from 'lucide-vue-next';
import { gamesList } from '../data/games.js';

const categoryCount = new Set(gamesList.map((game) => game.category)).size;
</script>

<template>
  <section class="mb-16">
    <div class="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
      <div class="lg:col-span-8">
        <div class="mb-4 inline-flex items-center gap-2 rounded-full bg-zinc-100/70 px-3 py-1 text-xs font-medium text-zinc-600">
          <span class="h-2 w-2 rounded-full bg-emerald-500" />
          <span>Ruang eksperimen terbuka</span>
        </div>

        <h1 class="mb-4 text-3xl font-bold tracking-tight text-zinc-900 sm:text-5xl sm:leading-[1.12]">
          Ide iseng yang berubah jadi
          <span class="bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-500 bg-clip-text text-transparent">
            mini-game & karya gabut.
          </span>
        </h1>

        <p class="mb-7 max-w-2xl text-base leading-relaxed text-zinc-600">
          Saya <strong class="font-semibold text-zinc-900">Heru</strong> — di sini saya merangkum mini-game serta eksperimen kode yang lahir dari rasa penasaran dan waktu luang. Setiap karya bisa langsung dimainkan di browser dan dibedah kode sumbernya di GitHub.
        </p>

        <div class="flex flex-wrap items-center gap-3">
          <RouterLink to="/games" class="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-xs font-medium text-white shadow-xs transition-all hover:bg-zinc-800 active:scale-95">
            <Play class="h-3.5 w-3.5 fill-current" />
            <span>Mainkan Karya</span>
          </RouterLink>
          <RouterLink to="/tentang" class="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-xs font-medium text-zinc-700 transition-all hover:border-zinc-300 hover:bg-zinc-50 active:scale-95">
            <Code2 class="h-3.5 w-3.5" />
            <span>Tentang Proyek</span>
          </RouterLink>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-3 lg:col-span-4 lg:grid-cols-1">
        <div class="rounded-2xl bg-zinc-100/70 p-4">
          <div class="text-2xl font-bold tracking-tight text-zinc-900">{{ gamesList.length }}</div>
          <div class="mt-0.5 text-xs text-zinc-900">Karya & Eksperimen</div>
        </div>
        <div class="rounded-2xl bg-zinc-100/70 p-4">
          <div class="text-2xl font-bold tracking-tight text-zinc-900">{{ categoryCount }}</div>
          <div class="mt-0.5 text-xs text-zinc-900">Kategori Genre</div>
        </div>
        <div class="rounded-2xl bg-zinc-100/70 p-4">
          <div class="text-2xl font-bold tracking-tight text-zinc-900">100%</div>
          <div class="mt-0.5 text-xs text-zinc-900">Demo & Kode Terbuka</div>
        </div>
      </div>
    </div>
  </section>
</template>
