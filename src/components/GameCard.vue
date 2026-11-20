<script setup>
import { ref } from 'vue';
import { Play, Github, Info } from 'lucide-vue-next';

const props = defineProps({
  game: {
    type: Object,
    required: true
  }
});

defineEmits(['select']);

const imgSrc = ref(props.game.thumbnail);

const handleImgError = () => {
  if (props.game.fallbackThumbnail && imgSrc.value !== props.game.fallbackThumbnail) {
    imgSrc.value = props.game.fallbackThumbnail;
  }
};
</script>

<template>
  <article class="group flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-4 transition-all duration-200 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-sm">
    <div>
      <!-- Thumbnail -->
      <div
        @click="$emit('select', game)"
        class="relative mb-4 aspect-video w-full cursor-pointer overflow-hidden rounded-xl bg-zinc-100"
      >
        <img
          :src="imgSrc"
          :alt="game.title"
          @error="handleImgError"
          class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span class="absolute right-2.5 top-2.5 rounded-full border border-zinc-200/80 bg-white/90 px-2.5 py-1 text-xs font-medium text-zinc-700 backdrop-blur-xs">
          {{ game.category }}
        </span>
      </div>

      <!-- Judul & Tombol Info -->
      <div class="mb-2.5 flex items-start justify-between gap-2">
        <h3
          @click="$emit('select', game)"
          class="cursor-pointer text-lg font-semibold tracking-tight text-zinc-900 transition-colors group-hover:text-zinc-600"
        >
          {{ game.title }}
        </h3>
        <button
          type="button"
          @click="$emit('select', game)"
          title="Catatan di balik layar"
          class="shrink-0 rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
        >
          <Info class="h-4 w-4" />
        </button>
      </div>

      <!-- Deskripsi -->
      <p class="mb-4 line-clamp-2 text-sm leading-relaxed text-zinc-600">
        {{ game.description }}
      </p>

      <!-- Tech Tags -->
      <div class="mb-5 flex flex-wrap gap-1.5">
        <span
          v-for="tag in game.tags"
          :key="tag"
          class="rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600"
        >
          {{ tag }}
        </span>
      </div>
    </div>

    <!-- Aksi Demo & Kode -->
    <div class="grid grid-cols-2 gap-2.5 border-t border-zinc-100 pt-3.5">
      <a
        :href="game.demoUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center justify-center gap-1.5 rounded-xl bg-zinc-900 px-3 py-2 text-xs font-medium text-white transition-all hover:bg-zinc-800 active:scale-95"
      >
        <Play class="h-3.5 w-3.5 fill-current" />
        Mainkan
      </a>
      <a
        :href="game.repoUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center justify-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-700 transition-all hover:bg-zinc-50 active:scale-95"
      >
        <Github class="h-3.5 w-3.5" />
        Kode
      </a>
    </div>
  </article>
</template>