<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { Github, Menu, X, ArrowUpRight, Sparkles } from 'lucide-vue-next';
import logo from '/gabut-lab.png';
import { useGameLibrary } from './composables/useGameLibrary.js';

const { historyCount } = useGameLibrary();

const mobileMenuOpen = ref(false);
const logoError = ref(false);

const closeDrawer = () => {
  mobileMenuOpen.value = false;
};

const handleKeydown = (e) => {
  if (e.key === 'Escape' && mobileMenuOpen.value) {
    closeDrawer();
  }
};

watch(mobileMenuOpen, (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

onMounted(() => window.addEventListener('keydown', handleKeydown));
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
  document.body.style.overflow = '';
});
</script>

<template>
  <div
    class="relative flex min-h-screen flex-col bg-white text-zinc-900 selection:bg-blue-600 selection:text-white"
  >
    <!-- Latar Gradien Sangat Halus Ala Kanvas Bersih Google -->
    <div
      aria-hidden="true"
      class="pointer-events-none fixed inset-x-0 top-0 -z-10 h-80 bg-gradient-to-b from-blue-50/45 via-amber-50/20 to-transparent"
    />

    <!-- Sticky Navbar Bergaya Google Header -->
    <header class="sticky top-0 z-30 border-b border-zinc-200/75 bg-white/85 backdrop-blur-xl">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <!-- Brand Logo + Wordmark gabut.lab -->
        <RouterLink
          to="/"
          @click="closeDrawer"
          class="group inline-flex items-center gap-2.5 text-base font-extrabold tracking-tight text-zinc-900 sm:text-lg"
        >
          <img
            v-if="!logoError"
            :src="logo"
            alt="Logo gabut.lab"
            @error="logoError = true"
            class="h-9 w-9 rounded-2xl border border-zinc-200/70 bg-white object-contain p-0.5 shadow-2xs transition-transform duration-200 group-hover:scale-105"
          />
          <span
            v-else
            class="flex h-9 w-9 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 ring-1 ring-blue-200/70"
          >
            <Sparkles class="h-4 w-4" />
          </span>

          <span class="flex items-baseline">
            <span class="text-blue-500">g</span>
            <span class="text-rose-500">a</span>
            <span class="text-amber-500">b</span>
            <span class="text-blue-500">u</span>
            <span class="text-emerald-500">t</span>
            <span class="text-rose-500">.</span>
            <span class="text-zinc-900">lab</span>
          </span>

          <span class="hidden rounded-full border border-zinc-200/80 bg-zinc-50 px-2.5 py-0.5 text-[11px] font-semibold text-zinc-500 sm:inline-block">
            v1.0
          </span>
        </RouterLink>

        <!-- Desktop Nav -->
        <nav class="hidden items-center gap-1.5 md:flex">
          <RouterLink
            to="/"
            exact-active-class="bg-blue-50 text-blue-700 ring-1 ring-blue-200/70"
            class="rounded-full px-4 py-2 text-sm font-semibold text-zinc-600 transition-all hover:bg-zinc-100/80 hover:text-zinc-900"
          >
            Home
          </RouterLink>
          <RouterLink
            to="/game"
            active-class="bg-blue-50 text-blue-700 ring-1 ring-blue-200/70"
            class="rounded-full px-4 py-2 text-sm font-semibold text-zinc-600 transition-all hover:bg-zinc-100/80 hover:text-zinc-900"
          >
            Game
          </RouterLink>
          <RouterLink
            to="/riwayat"
            active-class="bg-blue-50 text-blue-700 ring-1 ring-blue-200/70"
            class="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-zinc-600 transition-all hover:bg-zinc-100/80 hover:text-zinc-900"
          >
            <span>Riwayat</span>
            <span
              v-if="historyCount > 0"
              class="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-700"
            >
              {{ historyCount }}
            </span>
          </RouterLink>
          <RouterLink
            to="/tentang"
            active-class="bg-blue-50 text-blue-700 ring-1 ring-blue-200/70"
            class="rounded-full px-4 py-2 text-sm font-semibold text-zinc-600 transition-all hover:bg-zinc-100/80 hover:text-zinc-900"
          >
            Tentang
          </RouterLink>

          <div class="mx-2 h-5 w-px bg-zinc-200" />

          <a
            href="https://github.com/mochherucahyono"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4.5 py-2 text-sm font-semibold text-white shadow-2xs transition-all hover:bg-blue-700 active:scale-95"
          >
            <Github class="h-4 w-4" />
            <span>GitHub</span>
            <ArrowUpRight class="h-3.5 w-3.5 opacity-85" />
          </a>
        </nav>

        <!-- Mobile Menu Button -->
        <button
          type="button"
          @click="mobileMenuOpen = true"
          aria-label="Buka menu navigasi"
          class="relative inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-zinc-200/80 bg-white text-zinc-700 transition-colors hover:bg-zinc-100 md:hidden"
        >
          <Menu class="h-5 w-5" />
          <span
            v-if="historyCount > 0"
            class="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-500 px-1 text-[10px] font-bold text-white"
          >
            {{ historyCount }}
          </span>
        </button>
      </div>
    </header>

    <!-- Routed Page Content -->
    <main class="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="border-t border-zinc-100 py-8 text-center text-xs text-zinc-500 sm:text-sm">
      <div class="mx-auto flex max-w-6xl flex-col items-center justify-center gap-2 px-4 sm:flex-row sm:gap-3">
        <span class="inline-flex items-center gap-1.5 font-semibold text-zinc-700">
          <span class="h-2 w-2 rounded-full bg-blue-500" />
          <span class="h-2 w-2 rounded-full bg-rose-500" />
          <span class="h-2 w-2 rounded-full bg-amber-500" />
          <span class="h-2 w-2 rounded-full bg-emerald-500" />
          <span class="ml-1">gabut.lab</span>
        </span>
        <span class="hidden text-zinc-300 sm:inline">•</span>
        <span>&copy; 2026 Dibuat oleh Heru Cahyono.</span>
      </div>
    </footer>

    <!-- Backdrop (fade halus) -->
    <Transition
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="mobileMenuOpen"
        @click="closeDrawer"
        class="fixed inset-0 z-50 bg-zinc-900/40 backdrop-blur-xs md:hidden"
      />
    </Transition>

    <!-- Panel Drawer (slide halus dari kanan) -->
    <Transition
      enter-active-class="transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-200 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <aside
        v-if="mobileMenuOpen"
        aria-label="Menu navigasi mobile"
        class="fixed inset-y-0 right-0 z-50 flex w-72 flex-col justify-between border-l border-zinc-200 bg-white p-6 shadow-2xl will-change-transform md:hidden"
      >
        <div>
          <div class="mb-8 flex items-center justify-between">
            <span class="flex items-center gap-2.5 text-base font-extrabold text-zinc-900">
              <img
                v-if="!logoError"
                :src="logo"
                alt=""
                @error="logoError = true"
                class="h-8 w-8 rounded-xl object-contain"
              />
              <span class="flex items-baseline">
                <span class="text-blue-500">g</span>
                <span class="text-rose-500">a</span>
                <span class="text-amber-500">b</span>
                <span class="text-blue-500">u</span>
                <span class="text-emerald-500">t</span>
                <span class="text-rose-500">.</span>
                <span class="text-zinc-900">lab</span>
              </span>
            </span>
            <button
              type="button"
              @click="closeDrawer"
              aria-label="Tutup menu"
              class="rounded-full border border-zinc-200/80 p-1.5 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
            >
              <X class="h-5 w-5" />
            </button>
          </div>

          <nav class="flex flex-col gap-2 text-sm font-semibold text-zinc-700">
            <RouterLink
              to="/"
              @click="closeDrawer"
              exact-active-class="bg-blue-50 text-blue-700 ring-1 ring-blue-200/70"
              class="rounded-2xl px-4 py-3 transition-colors hover:bg-zinc-100"
            >
              Home
            </RouterLink>
            <RouterLink
              to="/game"
              @click="closeDrawer"
              active-class="bg-blue-50 text-blue-700 ring-1 ring-blue-200/70"
              class="rounded-2xl px-4 py-3 transition-colors hover:bg-zinc-100"
            >
              Game
            </RouterLink>
            <RouterLink
              to="/riwayat"
              @click="closeDrawer"
              active-class="bg-blue-50 text-blue-700 ring-1 ring-blue-200/70"
              class="flex items-center justify-between rounded-2xl px-4 py-3 transition-colors hover:bg-zinc-100"
            >
              <span>Riwayat</span>
              <span
                v-if="historyCount > 0"
                class="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-700"
              >
                {{ historyCount }}
              </span>
            </RouterLink>
            <RouterLink
              to="/tentang"
              @click="closeDrawer"
              active-class="bg-blue-50 text-blue-700 ring-1 ring-blue-200/70"
              class="rounded-2xl px-4 py-3 transition-colors hover:bg-zinc-100"
            >
              Tentang
            </RouterLink>
          </nav>
        </div>

        <a
          href="https://github.com/mochherucahyono"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-blue-700"
        >
          <Github class="h-4 w-4" />
          <span>Buka Profil GitHub</span>
        </a>
      </aside>
    </Transition>
  </div>
</template>