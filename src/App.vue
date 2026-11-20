<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import {
  Github,
  Sparkles,
  Search,
  X,
  Play,
  Info,
  Code2,
  Menu,
  ArrowUpRight,
  Check,
  Copy,
  Layers
} from 'lucide-vue-next';
import { gamesList } from './data/games.js';

const selectedCategory = ref('Semua');
const searchQuery = ref('');
const activeGame = ref(null);
const activeSection = ref('home');
const mobileMenuOpen = ref(false);
const brokenImages = ref({});
const copiedKey = ref('');

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

const totalCategoriesCount = computed(() => Math.max(categories.value.length - 1, 0));

const getThumbnailSrc = (game) => {
  if (brokenImages.value[game.id] && game.fallbackThumbnail) {
    return game.fallbackThumbnail;
  }
  return game.thumbnail;
};

const handleImgError = (gameId) => {
  brokenImages.value[gameId] = true;
};

const resetFilters = () => {
  selectedCategory.value = 'Semua';
  searchQuery.value = '';
};

const openGameModal = (game) => {
  activeGame.value = game;
  copiedKey.value = '';
};

const closeGameModal = () => {
  activeGame.value = null;
  copiedKey.value = '';
};

const copyToClipboard = async (text, key) => {
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
    copiedKey.value = key;
    setTimeout(() => {
      if (copiedKey.value === key) copiedKey.value = '';
    }, 1800);
  } catch {
    copiedKey.value = '';
  }
};

const updateActiveSection = () => {
  const scrollPos = window.scrollY + 140;
  const sections = ['tentang', 'games', 'home'];

  for (const id of sections) {
    const el = document.getElementById(id);
    if (el && scrollPos >= el.offsetTop) {
      activeSection.value = id;
      break;
    }
  }
};

const handleKeydown = (e) => {
  if (e.key === 'Escape') {
    if (activeGame.value) closeGameModal();
    if (mobileMenuOpen.value) mobileMenuOpen.value = false;
  }
};

watch([activeGame, mobileMenuOpen], ([modalOpen, drawerOpen]) => {
  document.body.style.overflow = modalOpen || drawerOpen ? 'hidden' : '';
});

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
  window.addEventListener('scroll', updateActiveSection, { passive: true });
  updateActiveSection();
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
  window.removeEventListener('scroll', updateActiveSection);
  document.body.style.overflow = '';
});
</script>

<template>
  <div
    class="relative flex min-h-screen flex-col bg-white text-zinc-900 selection:bg-zinc-900 selection:text-white"
  >
    <!-- Subtle Top Ambient Glow -->
    <div
      aria-hidden="true"
      class="pointer-events-none fixed inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-zinc-100/80 via-zinc-50/40 to-transparent"
    />

    <!-- Navbar -->
    <header class="sticky top-0 z-30 border-b border-zinc-200/70 bg-white/80 backdrop-blur-xl">
      <div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-3.5 sm:px-6">
        <a
          href="#home"
          @click="activeSection = 'home'"
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
        </a>

        <!-- Desktop Nav -->
        <nav class="hidden items-center gap-1 md:flex">
          <a
            href="#home"
            @click="activeSection = 'home'"
            :class="[
              'rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors',
              activeSection === 'home'
                ? 'bg-zinc-100 text-zinc-900'
                : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
            ]"
          >
            Home
          </a>
          <a
            href="#games"
            @click="activeSection = 'games'"
            :class="[
              'rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors',
              activeSection === 'games'
                ? 'bg-zinc-100 text-zinc-900'
                : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
            ]"
          >
            Game
          </a>
          <a
            href="#tentang"
            @click="activeSection = 'tentang'"
            :class="[
              'rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors',
              activeSection === 'tentang'
                ? 'bg-zinc-100 text-zinc-900'
                : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
            ]"
          >
            Tentang
          </a>
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

    <!-- Main Content -->
    <main class="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6 sm:py-14">
      <!-- Hero / Sapaan Pembuat -->
      <section id="home" class="mb-16 scroll-mt-24">
        <div class="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
          <div class="lg:col-span-8">
            <div
              class="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-200/90 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-600"
            >
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
              <a
                href="#games"
                class="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-xs font-medium text-white shadow-xs transition-all hover:bg-zinc-800 active:scale-95"
              >
                <Play class="h-3.5 w-3.5 fill-current" />
                <span>Mainkan Karya</span>
              </a>
              <a
                href="#tentang"
                class="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-5 py-2.5 text-xs font-medium text-zinc-700 transition-all hover:border-zinc-300 hover:bg-zinc-50 active:scale-95"
              >
                <span>Tentang Proyek</span>
              </a>
            </div>
          </div>

          <!-- Compact Stats Bento -->
          <div class="grid grid-cols-3 gap-3 lg:col-span-4 lg:grid-cols-1">
            <div class="rounded-2xl border border-zinc-200/80 bg-zinc-50/70 p-4">
              <div class="text-2xl font-bold tracking-tight text-zinc-900">
                {{ gamesList.length }}
              </div>
              <div class="mt-0.5 text-xs text-zinc-500">Karya & Eksperimen</div>
            </div>

            <div class="rounded-2xl border border-zinc-200/80 bg-zinc-50/70 p-4">
              <div class="text-2xl font-bold tracking-tight text-zinc-900">
                {{ totalCategoriesCount }}
              </div>
              <div class="mt-0.5 text-xs text-zinc-500">Kategori Genre</div>
            </div>

            <div class="rounded-2xl border border-zinc-200/80 bg-zinc-50/70 p-4">
              <div class="text-2xl font-bold tracking-tight text-zinc-900">100%</div>
              <div class="mt-0.5 text-xs text-zinc-500">Demo & Kode Terbuka</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Katalog Game -->
      <section id="games" class="mb-20 scroll-mt-24">
        <div class="mb-6 flex flex-col gap-4 border-b border-zinc-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <!-- Category Pills -->
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

          <!-- Search Input -->
          <div class="relative w-full sm:w-72">
            <Search
              class="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400"
            />
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

        <!-- Grid -->
        <div
          v-if="filteredGames.length > 0"
          class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <article
            v-for="game in filteredGames"
            :key="game.id"
            class="group flex flex-col justify-between rounded-2xl border border-zinc-200/90 bg-white p-4 transition-all duration-200 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-md hover:shadow-zinc-900/5"
          >
            <div>
              <!-- Thumbnail -->
              <div
                @click="openGameModal(game)"
                class="relative mb-4 aspect-video w-full cursor-pointer overflow-hidden rounded-xl border border-zinc-100 bg-zinc-100"
              >
                <img
                  :src="getThumbnailSrc(game)"
                  :alt="game.title"
                  @error="handleImgError(game.id)"
                  class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div
                  class="absolute inset-0 flex items-center justify-center bg-zinc-950/0 transition-colors duration-200 group-hover:bg-zinc-950/20"
                >
                  <span
                    class="inline-flex translate-y-2 items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-medium text-zinc-900 opacity-0 shadow-sm backdrop-blur-xs transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    <Layers class="h-3.5 w-3.5" />
                    Detail Karya
                  </span>
                </div>

                <span
                  class="absolute left-2.5 top-2.5 rounded-full border border-zinc-200/80 bg-white/90 px-2.5 py-0.5 text-[11px] font-medium text-zinc-700 backdrop-blur-xs"
                >
                  {{ game.category }}
                </span>
              </div>

              <!-- Title & Info -->
              <div class="mb-2 flex items-start justify-between gap-2">
                <h2
                  @click="openGameModal(game)"
                  class="cursor-pointer text-base font-semibold tracking-tight text-zinc-900 transition-colors group-hover:text-zinc-600"
                >
                  {{ game.title }}
                </h2>
                <button
                  type="button"
                  @click="openGameModal(game)"
                  title="Catatan di balik layar"
                  class="shrink-0 rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
                >
                  <Info class="h-4 w-4" />
                </button>
              </div>

              <p class="mb-4 line-clamp-2 text-xs leading-relaxed text-zinc-600 sm:text-sm">
                {{ game.description }}
              </p>

              <!-- Tech Stack -->
              <div class="mb-5 flex flex-wrap gap-1.5">
                <span
                  v-for="tag in game.tags"
                  :key="tag"
                  class="rounded-md border border-zinc-200/70 bg-zinc-50 px-2 py-0.5 text-[11px] font-medium text-zinc-600"
                >
                  {{ tag }}
                </span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="grid grid-cols-2 gap-2.5 border-t border-zinc-100 pt-3.5">
              <a
                :href="game.demoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center gap-1.5 rounded-xl bg-zinc-900 px-3 py-2 text-xs font-medium text-white transition-all hover:bg-zinc-800 active:scale-95"
              >
                <Play class="h-3.5 w-3.5 fill-current" />
                <span>Mainkan</span>
              </a>
              <a
                :href="game.repoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-700 transition-all hover:border-zinc-300 hover:bg-zinc-50 active:scale-95"
              >
                <Github class="h-3.5 w-3.5" />
                <span>GitHub</span>
              </a>
            </div>
          </article>
        </div>

        <!-- Empty State -->
        <div
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
            class="rounded-full bg-zinc-900 px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-zinc-800"
          >
            Reset Filter
          </button>
        </div>
      </section>

      <!-- Tentang -->
      <section
        id="tentang"
        class="scroll-mt-24 rounded-3xl border border-zinc-200/80 bg-zinc-50/70 p-6 sm:p-10"
      >
        <div class="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-start">
          <div class="md:col-span-5">
            <div class="mb-3 inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-600">
              <Code2 class="h-3.5 w-3.5" />
              <span>Tentang gabut-lab</span>
            </div>
            <h2 class="text-2xl font-bold tracking-tight text-zinc-900">
              Ruang bebas bereksperimen tanpa beban target.
            </h2>
          </div>

          <div class="space-y-3.5 text-sm leading-relaxed text-zinc-600 md:col-span-7">
            <p>
              Tidak semua proyek harus lahir dari dokumen spesifikasi panjang atau orientasi komersial. Sering kali ide paling seru justru muncul saat mengulik API browser, menyusun logika permainan sederhana, atau mengisi waktu luang.
            </p>
            <p>
              Setiap entri di halaman ini sengaja dibuat ringan agar bisa langsung dicoba lewat tautan demo dan dipelajari struktur kodenya lewat repositori GitHub masing-masing.
            </p>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="border-t border-zinc-100 py-8 text-center text-xs text-zinc-500">
      &copy; 2026 GabutLab. Dibuat oleh Heru Cahyono dengan senang hati.
    </footer>

    <!-- Mobile Drawer -->
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="mobileMenuOpen"
        @click.self="mobileMenuOpen = false"
        class="fixed inset-0 z-50 flex justify-end bg-zinc-900/40 backdrop-blur-xs md:hidden"
      >
        <div class="flex h-full w-72 flex-col justify-between border-l border-zinc-200 bg-white p-6 shadow-2xl">
          <div>
            <div class="mb-8 flex items-center justify-between">
              <span class="flex items-center gap-2 text-sm font-semibold text-zinc-900">
                <Sparkles class="h-4 w-4" />
                gabut-lab
              </span>
              <button
                type="button"
                @click="mobileMenuOpen = false"
                aria-label="Tutup menu"
                class="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"
              >
                <X class="h-5 w-5" />
              </button>
            </div>

            <nav class="flex flex-col gap-2 text-sm font-medium text-zinc-700">
              <a
                href="#home"
                @click="mobileMenuOpen = false"
                class="rounded-xl px-3 py-2.5 transition-colors hover:bg-zinc-100"
              >
                Home
              </a>
              <a
                href="#games"
                @click="mobileMenuOpen = false"
                class="rounded-xl px-3 py-2.5 transition-colors hover:bg-zinc-100"
              >
                Game
              </a>
              <a
                href="#tentang"
                @click="mobileMenuOpen = false"
                class="rounded-xl px-3 py-2.5 transition-colors hover:bg-zinc-100"
              >
                Tentang
              </a>
            </nav>
          </div>

          <a
            href="https://github.com/username"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-2.5 text-xs font-medium text-white hover:bg-zinc-800"
          >
            <Github class="h-4 w-4" />
            <span>Buka Profil GitHub</span>
          </a>
        </div>
      </div>
    </Transition>

    <!-- Detail Modal -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="activeGame"
        @click.self="closeGameModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/45 p-4 backdrop-blur-xs"
      >
        <div class="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl">
          <div class="mb-4 flex items-center justify-between">
            <span class="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
              {{ activeGame.category }}
            </span>
            <button
              type="button"
              @click="closeGameModal"
              aria-label="Tutup modal"
              class="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
            >
              <X class="h-5 w-5" />
            </button>
          </div>

          <h3 class="mb-2 text-xl font-bold tracking-tight text-zinc-900">
            {{ activeGame.title }}
          </h3>
          <p class="mb-4 text-sm leading-relaxed text-zinc-600">
            {{ activeGame.description }}
          </p>

          <div class="mb-4 flex flex-wrap gap-1.5">
            <span
              v-for="tag in activeGame.tags"
              :key="tag"
              class="rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600"
            >
              {{ tag }}
            </span>
          </div>

          <div class="mb-5 rounded-xl border border-zinc-200/70 bg-zinc-50 p-3.5 text-xs leading-relaxed text-zinc-600">
            <strong class="mb-1 block font-semibold text-zinc-900">Catatan di Balik Layar:</strong>
            {{ activeGame.notes }}
          </div>

          <!-- Quick Copy Links -->
          <div class="mb-5 grid grid-cols-2 gap-2">
            <button
              type="button"
              @click="copyToClipboard(activeGame.demoUrl, 'demo')"
              class="inline-flex items-center justify-center gap-1.5 rounded-xl border border-zinc-200 bg-zinc-50/70 px-3 py-2 text-[11px] font-medium text-zinc-600 transition-colors hover:bg-zinc-100"
            >
              <Check v-if="copiedKey === 'demo'" class="h-3.5 w-3.5 text-emerald-600" />
              <Copy v-else class="h-3.5 w-3.5" />
              <span>{{ copiedKey === 'demo' ? 'Link Demo Disalin' : 'Salin Link Demo' }}</span>
            </button>
            <button
              type="button"
              @click="copyToClipboard(activeGame.repoUrl, 'repo')"
              class="inline-flex items-center justify-center gap-1.5 rounded-xl border border-zinc-200 bg-zinc-50/70 px-3 py-2 text-[11px] font-medium text-zinc-600 transition-colors hover:bg-zinc-100"
            >
              <Check v-if="copiedKey === 'repo'" class="h-3.5 w-3.5 text-emerald-600" />
              <Copy v-else class="h-3.5 w-3.5" />
              <span>{{ copiedKey === 'repo' ? 'Link Repo Disalin' : 'Salin Link Repo' }}</span>
            </button>
          </div>

          <div class="flex gap-3">
            <a
              :href="activeGame.demoUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-zinc-900 py-2.5 text-xs font-medium text-white transition-colors hover:bg-zinc-800"
            >
              <Play class="h-3.5 w-3.5 fill-current" />
              <span>Mainkan</span>
            </a>
            <a
              :href="activeGame.repoUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-zinc-200 bg-white py-2.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
            >
              <Github class="h-3.5 w-3.5" />
              <span>Lihat GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>