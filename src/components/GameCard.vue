<script setup>
import { ref, watch, computed } from 'vue';
import { Play, Github, Info, Heart } from 'lucide-vue-next';
import { useGameLibrary } from '../composables/useGameLibrary.js';
import { isSafeExternalUrl } from '../utils/urlValidator.js';

const props = defineProps({
  game: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['select', 'play']);

const { isFavorite, toggleFavorite } = useGameLibrary();

const imgSrc = ref(props.game?.thumbnail || '');
const hasError = ref(false);

const favorited = computed(() => isFavorite(props.game?.id));
const hasValidDemo = computed(() => isSafeExternalUrl(props.game?.demoUrl));
const hasValidRepo = computed(() => isSafeExternalUrl(props.game?.repoUrl));

watch(
  () => props.game?.thumbnail,
  (nextThumb) => {
    imgSrc.value = nextThumb || '';
    hasError.value = false;
  }
);

const handleImgError = () => {
  if (
    props.game?.fallbackThumbnail &&
    imgSrc.value !== props.game.fallbackThumbnail
  ) {
    imgSrc.value = props.game.fallbackThumbnail;
    return;
  }
  hasError.value = true;
};

const handleToggleFavorite = () => {
  if (props.game?.id !== undefined) {
    toggleFavorite(props.game.id);
  }
};

const handlePlayClick = () => {
  if (props.game && hasValidDemo.value) {
    emit('play', props.game);
  }
};
</script>

<template>
  <article
    class="group flex flex-col justify-between rounded-3xl border border-zinc-200/80 bg-white p-5 shadow-[0_4px_24px_-10px_rgba(0,0,0,0.07)] transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-[0_12px_32px_-10px_rgba(0,0,0,0.11)]"
  >
    <div>
      <!-- Thumbnail -->
      <div
        class="relative mb-5 aspect-video w-full overflow-hidden rounded-2xl border border-zinc-100 bg-zinc-100"
      >
        <img
          v-if="imgSrc && !hasError"
          :src="imgSrc"
          :alt="game?.title || 'Preview karya'"
          @click="$emit('select', game)"
          @error="handleImgError"
          class="h-full w-full cursor-pointer object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div
          v-else
          @click="$emit('select', game)"
          class="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 bg-amber-50/70 px-4 text-center"
        >
          <span class="rounded-full bg-white px-3 py-1 text-xs font-semibold text-zinc-700 ring-1 ring-zinc-200/80">
            gabut.lab
          </span>
          <span class="text-sm font-semibold text-zinc-800">
            {{ game?.title || 'Eksperimen Kode' }}
          </span>
        </div>

        <!-- Tombol Favorit -->
        <button
          type="button"
          @click.stop="handleToggleFavorite"
          :aria-label="
            favorited
              ? `Hapus ${game?.title || 'game'} dari favorit`
              : `Tambahkan ${game?.title || 'game'} ke favorit`
          "
          :aria-pressed="favorited"
          :title="favorited ? 'Hapus dari favorit' : 'Simpan ke favorit'"
          :class="[
            'absolute left-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border shadow-2xs backdrop-blur-xs transition-all duration-200 active:scale-90',
            favorited
              ? 'border-rose-200 bg-rose-50/95 text-rose-500 hover:bg-rose-100'
              : 'border-zinc-200/90 bg-white/95 text-zinc-500 hover:border-rose-200 hover:text-rose-500'
          ]"
        >
          <Heart :class="['h-4 w-4 transition-transform', favorited ? 'scale-110 fill-current' : '']" />
        </button>

        <!-- Badge Kategori -->
        <span
          v-if="game?.category"
          class="pointer-events-none absolute right-3 top-3 rounded-full border border-zinc-200/90 bg-white/95 px-3 py-1 text-xs font-semibold text-zinc-700 shadow-2xs backdrop-blur-xs"
        >
          {{ game.category }}
        </span>
      </div>

      <!-- Judul & Tombol Info -->
      <div class="mb-2.5 flex items-start justify-between gap-2.5">
        <h3
          @click="$emit('select', game)"
          class="cursor-pointer text-lg font-bold tracking-tight text-zinc-900 transition-colors group-hover:text-blue-600 sm:text-xl"
        >
          {{ game?.title || 'Tanpa Judul' }}
        </h3>
        <button
          type="button"
          @click="$emit('select', game)"
          title="Catatan di balik layar"
          aria-label="Catatan di balik layar"
          class="shrink-0 rounded-xl border border-zinc-200/80 bg-zinc-50 p-2 text-zinc-500 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
        >
          <Info class="h-4 w-4" />
        </button>
      </div>

      <!-- Deskripsi -->
      <p class="mb-4 line-clamp-2 text-sm leading-relaxed text-zinc-600 sm:text-[15px]">
        {{ game?.description || '' }}
      </p>

      <!-- Tech Tags -->
      <div v-if="Array.isArray(game?.tags) && game.tags.length > 0" class="mb-5 flex flex-wrap gap-1.5">
        <span
          v-for="tag in game.tags"
          :key="tag"
          class="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700"
        >
          {{ tag }}
        </span>
      </div>
    </div>

    <!-- Aksi Demo & Kode -->
    <div class="grid grid-cols-2 gap-3 border-t border-zinc-100 pt-4">
      <button
        v-if="hasValidDemo"
        type="button"
        @click="handlePlayClick"
        :aria-label="`Mainkan embed ${game?.title || 'game'}`"
        class="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-2xs transition-all hover:bg-blue-700 active:scale-95 sm:text-sm"
      >
        <Play class="h-4 w-4 fill-current" />
        <span>Mainkan</span>
      </button>
      <span
        v-else
        class="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full bg-zinc-100 px-4 py-2.5 text-xs font-medium text-zinc-400 sm:text-sm"
      >
        <Play class="h-4 w-4" />
        <span>Mainkan</span>
      </span>

      <a
        v-if="hasValidRepo"
        :href="game.repoUrl"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="`Lihat kode sumber ${game?.title || 'game'} di GitHub`"
        class="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2.5 text-xs font-semibold text-zinc-700 transition-all hover:border-zinc-300 hover:bg-zinc-50 active:scale-95 sm:text-sm"
      >
        <Github class="h-4 w-4" />
        <span>Kode</span>
      </a>
      <span
        v-else
        class="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full border border-zinc-100 bg-zinc-50 px-4 py-2.5 text-xs font-medium text-zinc-400 sm:text-sm"
      >
        <Github class="h-4 w-4" />
        <span>Kode</span>
      </span>
    </div>
  </article>
</template>