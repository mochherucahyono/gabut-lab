<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue';
import {
  X,
  ExternalLink,
  Github,
  Loader2,
  AlertTriangle,
  RotateCw,
  Sparkles,
} from 'lucide-vue-next';
import { normalizeSafeExternalUrl } from '../utils/urlValidator.js';

const props = defineProps({
  game: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['close']);

const closeBtnRef = ref(null);
const iframeKey = ref(0);
const isLoading = ref(true);
const hasEmbedError = ref(false);
const previousFocusedElement = ref(null);

// Gesture sentuh ringan (swipe ke bawah atau ke kanan untuk menutup)
const touchStartX = ref(0);
const touchStartY = ref(0);

const safeDemoUrl = computed(() => normalizeSafeExternalUrl(props.game?.demoUrl));
const safeRepoUrl = computed(() => normalizeSafeExternalUrl(props.game?.repoUrl));

const resetEmbedState = () => {
  isLoading.value = Boolean(safeDemoUrl.value);
  hasEmbedError.value = !safeDemoUrl.value;
};

const handleClose = () => {
  emit('close');
};

const handleIframeLoad = () => {
  isLoading.value = false;
};

const handleIframeError = () => {
  isLoading.value = false;
  hasEmbedError.value = true;
};

const handleRetryIframe = () => {
  if (!safeDemoUrl.value) {
    hasEmbedError.value = true;
    isLoading.value = false;
    return;
  }
  hasEmbedError.value = false;
  isLoading.value = true;
  iframeKey.value += 1;
};

const handleTouchStart = (event) => {
  const touch = event.changedTouches?.[0];
  if (!touch) return;
  touchStartX.value = touch.clientX;
  touchStartY.value = touch.clientY;
};

const handleTouchEnd = (event) => {
  const touch = event.changedTouches?.[0];
  if (!touch) return;

  const deltaX = touch.clientX - touchStartX.value;
  const deltaY = touch.clientY - touchStartY.value;

  // Tutup jika digeser cukup jauh ke bawah atau ke kanan tanpa dominasi scroll vertikal
  if (deltaY > 110 && Math.abs(deltaX) < 75) {
    handleClose();
  } else if (deltaX > 110 && Math.abs(deltaY) < 75) {
    handleClose();
  }
};

const handleKeydown = (event) => {
  if (event.key === 'Escape') {
    event.preventDefault();
    handleClose();
  }
};

watch(
  () => props.game,
  () => {
    resetEmbedState();
    iframeKey.value += 1;
    nextTick(() => {
      closeBtnRef.value?.focus?.();
    });
  },
  { immediate: true }
);

onMounted(() => {
  if (typeof document !== 'undefined') {
    previousFocusedElement.value = document.activeElement;
  }
  window.addEventListener('keydown', handleKeydown);
  nextTick(() => {
    closeBtnRef.value?.focus?.();
  });
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
  const prevEl = previousFocusedElement.value;
  if (prevEl && typeof prevEl.focus === 'function') {
    nextTick(() => {
      prevEl.focus?.();
    });
  }
});
</script>

<template>
  <div
    @click.self="handleClose"
    @touchstart.passive="handleTouchStart"
    @touchend.passive="handleTouchEnd"
    role="dialog"
    aria-modal="true"
    :aria-labelledby="`embed-modal-title-${game?.id ?? 'game'}`"
    class="fixed inset-0 z-50 flex items-stretch justify-center bg-zinc-950/60 backdrop-blur-xs sm:items-center sm:p-5"
  >
    <div
      class="relative flex h-dvh w-full flex-col overflow-hidden bg-white shadow-2xl sm:h-auto sm:max-h-[92dvh] sm:max-w-3xl sm:rounded-[2rem] sm:border sm:border-zinc-200/90"
    >
      <!-- Header Selalu Terlihat -->
      <header
        class="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-zinc-200/80 bg-white px-4 py-3.5 sm:px-6"
      >
        <div class="flex min-w-0 items-center gap-2.5">
          <span
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-blue-200/80 bg-blue-50 text-blue-600"
          >
            <Sparkles class="h-4 w-4" />
          </span>

          <div class="min-w-0">
            <div class="flex items-center gap-2">
              <h2
                :id="`embed-modal-title-${game?.id ?? 'game'}`"
                class="truncate text-base font-bold tracking-tight text-zinc-900 sm:text-lg"
              >
                {{ game?.title || 'Demo Game' }}
              </h2>
              <span
                v-if="game?.category"
                class="hidden shrink-0 rounded-full border border-blue-200/70 bg-blue-50 px-3 py-0.5 text-xs font-semibold text-blue-700 sm:inline-flex"
              >
                {{ game.category }}
              </span>
            </div>
            <p class="truncate text-xs text-zinc-500">
              Mode Embed · Geser ke bawah/kanan atau tekan Esc untuk menutup
            </p>
          </div>
        </div>

        <!-- Kontrol Header (Ukuran Nyaman untuk Layar Sentuh) -->
        <div class="flex items-center gap-2">
          <a
            v-if="safeDemoUrl"
            :href="safeDemoUrl"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="`Buka ${game?.title || 'demo'} di tab baru`"
            class="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white shadow-2xs transition-all hover:bg-blue-700 active:scale-95 sm:px-4 sm:text-sm"
          >
            <ExternalLink class="h-4 w-4" />
            <span>Tab Baru</span>
          </a>

          <a
            v-if="safeRepoUrl"
            :href="safeRepoUrl"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="`Buka repositori GitHub ${game?.title || 'game'} di tab baru`"
            class="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3.5 py-2 text-xs font-semibold text-zinc-700 transition-all hover:border-zinc-300 hover:bg-zinc-50 active:scale-95 sm:px-4 sm:text-sm"
          >
            <Github class="h-4 w-4" />
            <span class="hidden sm:inline">GitHub</span>
          </a>

          <button
            ref="closeBtnRef"
            type="button"
            @click="handleClose"
            aria-label="Tutup embed game"
            title="Tutup (Esc)"
            class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-zinc-200/90 bg-zinc-50 text-zinc-600 transition-colors hover:bg-rose-50 hover:text-rose-600 active:scale-95"
          >
            <X class="h-5 w-5" />
          </button>
        </div>
      </header>

      <!-- Area Viewport Game -->
      <div class="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-zinc-950 p-2 sm:p-5">
        <div
          class="relative flex h-full w-full max-w-5xl items-center justify-center overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 sm:aspect-video sm:h-auto sm:max-h-full"
        >
          <!-- State Loading -->
          <div
            v-if="safeDemoUrl && isLoading && !hasEmbedError"
            class="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-zinc-900/90 px-4 text-center text-zinc-200"
          >
            <Loader2 class="h-8 w-8 animate-spin text-blue-400" />
            <p class="text-sm font-semibold">Memuat demo {{ game?.title }}...</p>
            <p class="max-w-md text-xs text-zinc-400">
              Menyiapkan tampilan game di dalam frame. Jika tidak kunjung tampil, situs mungkin memblokir embed.
            </p>
          </div>

          <!-- Iframe Aman -->
          <iframe
            v-if="safeDemoUrl && !hasEmbedError"
            :key="iframeKey"
            :src="safeDemoUrl"
            :title="`Demo permainan ${game?.title || 'game'}`"
            allow="fullscreen; autoplay; encrypted-media"
            sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-presentation"
            allowfullscreen
            @load="handleIframeLoad"
            @error="handleIframeError"
            class="block h-full w-full border-0 bg-white"
          />

          <!-- Fallback Jika Gagal / Ditolak / URL Tidak Valid -->
          <div
            v-else
            class="flex max-w-md flex-col items-center justify-center gap-4 px-6 py-8 text-center"
          >
            <div
              class="flex h-12 w-12 items-center justify-center rounded-full border border-amber-300/40 bg-amber-400/15 text-amber-300"
            >
              <AlertTriangle class="h-6 w-6" />
            </div>

            <div>
              <h3 class="text-base font-bold text-white sm:text-lg">
                Demo tidak mendukung embed
              </h3>
              <p class="mt-1 text-xs leading-relaxed text-zinc-300 sm:text-sm">
                Situs eksternal untuk <strong>{{ game?.title || 'game ini' }}</strong> menolak dimuat di dalam iframe atau tautan embed tidak tersedia. Anda tetap dapat memainkannya langsung di tab baru.
              </p>
            </div>

            <div class="flex flex-wrap items-center justify-center gap-2.5">
              <a
                v-if="safeDemoUrl"
                :href="safeDemoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex min-h-10 items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white transition-all hover:bg-blue-700 active:scale-95 sm:text-sm"
              >
                <ExternalLink class="h-4 w-4" />
                <span>Buka di Tab Baru</span>
              </a>

              <button
                v-if="safeDemoUrl"
                type="button"
                @click="handleRetryIframe"
                class="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-xs font-semibold text-zinc-200 transition-colors hover:bg-zinc-700 active:scale-95 sm:text-sm"
              >
                <RotateCw class="h-3.5 w-3.5" />
                <span>Coba Muat Ulang</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Ringkas di Dalam Modal -->
      <footer
        class="flex shrink-0 flex-wrap items-center justify-between gap-2 border-t border-zinc-200/80 bg-zinc-50/80 px-4 py-2.5 text-xs text-zinc-600 sm:px-6"
      >
        <span class="line-clamp-1">
          {{ game?.notes || game?.description || 'Selamat bermain!' }}
        </span>

        <button
          v-if="safeDemoUrl && !hasEmbedError"
          type="button"
          @click="hasEmbedError = true"
          class="shrink-0 font-semibold text-blue-600 underline-offset-2 hover:underline"
        >
          Frame bermasalah? Buka opsi tab baru
        </button>
      </footer>
    </div>
  </div>
</template>