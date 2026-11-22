<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { Github, Sparkles, Menu, X, ArrowUpRight } from 'lucide-vue-next';

const mobileMenuOpen = ref(false);

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
    class="relative flex min-h-screen flex-col bg-white text-zinc-900 selection:bg-zinc-900 selection:text-white"
  >
    <div
      aria-hidden="true"
      class="pointer-events-none fixed inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-zinc-100/80 via-zinc-50/40 to-transparent"
    />

    <!-- Sticky Navbar -->
    <header class="sticky top-0 z-30 border-b border-zinc-200/70 bg-white/80 backdrop-blur-xl">
      <div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-3.5 sm:px-6">
        <RouterLink
          to="/"
          @click="closeDrawer"
          class="group inline-flex items-center gap-2.5 text-sm font-semibold tracking-tight text-zinc-900"
        >
          <span
            class="flex h-8 w-8 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-900 text-white transition-transform duration-200 group-hover:scale-105"
          >
            <Sparkles class="h-4 w-4" />
          </span>
          <span>GabutLab</span>
          <span class="hidden rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-500 sm:inline-block">
            v1.0
          </span>
        </RouterLink>

        <!-- Desktop Nav -->
        <nav class="hidden items-center gap-1 md:flex">
          <RouterLink
            to="/"
            exact-active-class="bg-zinc-100 text-zinc-900"
            class="rounded-full px-3.5 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900"
          >
            Home
          </RouterLink>
          <RouterLink
            to="/games"
            active-class="bg-zinc-100 text-zinc-900"
            class="rounded-full px-3.5 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900"
          >
            Game
          </RouterLink>
          <RouterLink
            to="/tentang"
            active-class="bg-zinc-100 text-zinc-900"
            class="rounded-full px-3.5 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-900"
          >
            Tentang
          </RouterLink>
          <div class="mx-2 h-4 w-px bg-zinc-200" />
          <a
            href="https://github.com/mochherucahyono"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-3.5 py-1.5 text-xs font-medium text-white transition-all hover:bg-zinc-800 active:scale-95"
          >
            <Github class="h-3.5 w-3.5" />
            <span>GitHub</span>
            <ArrowUpRight class="h-3 w-3 opacity-75" />
          </a>
        </nav>

        <!-- Mobile Menu Button -->
        <button
          type="button"
          @click="mobileMenuOpen = true"
          aria-label="Buka menu navigasi"
          class="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-700 transition-colors hover:bg-zinc-50 md:hidden"
        >
          <Menu class="h-4 w-4" />
        </button>
      </div>
    </header>

    <!-- Routed Page Content -->
    <main class="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="border-t border-zinc-100 py-8 text-center text-xs text-zinc-500">
      &copy; 2026 GabutLab. Dibuat oleh Heru Cahyono.
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
            <span class="flex items-center gap-2 text-sm font-semibold text-zinc-900">
              <Sparkles class="h-4 w-4" />
              GabutLab
            </span>
            <button
              type="button"
              @click="closeDrawer"
              aria-label="Tutup menu"
              class="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
            >
              <X class="h-5 w-5" />
            </button>
          </div>

          <nav class="flex flex-col gap-2 text-sm font-medium text-zinc-700">
            <RouterLink
              to="/"
              @click="closeDrawer"
              exact-active-class="bg-zinc-100 text-zinc-900"
              class="rounded-xl px-3 py-2.5 transition-colors hover:bg-zinc-100"
            >
              Home
            </RouterLink>
            <RouterLink
              to="/games"
              @click="closeDrawer"
              active-class="bg-zinc-100 text-zinc-900"
              class="rounded-xl px-3 py-2.5 transition-colors hover:bg-zinc-100"
            >
              Game
            </RouterLink>
            <RouterLink
              to="/tentang"
              @click="closeDrawer"
              active-class="bg-zinc-100 text-zinc-900"
              class="rounded-xl px-3 py-2.5 transition-colors hover:bg-zinc-100"
            >
              Tentang
            </RouterLink>
          </nav>
        </div>

        <a
          href="https://github.com/mochherucahyono"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-2.5 text-xs font-medium text-white transition-colors hover:bg-zinc-800"
        >
          <Github class="h-4 w-4" />
          <span>Buka Profil GitHub</span>
        </a>
      </aside>
    </Transition>
  </div>
</template>