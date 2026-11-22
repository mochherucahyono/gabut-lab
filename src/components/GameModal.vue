<script setup>
import { onMounted, onUnmounted } from 'vue';
import { X, Play, Github } from 'lucide-vue-next';

defineProps({
  game: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['close']);

const handleKeydown = (e) => {
  if (e.key === 'Escape') emit('close');
};

onMounted(() => window.addEventListener('keydown', handleKeydown));
onUnmounted(() => window.removeEventListener('keydown', handleKeydown));
</script>

<template>
  <div
    @click.self="emit('close')"
    class="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/40 p-4 backdrop-blur-xs"
  >
    <div class="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl">
      <div class="mb-4 flex items-center justify-between">
        <span class="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700">
          {{ game.category }}
        </span>
        <button
          type="button"
          @click="emit('close')"
          aria-label="Tutup modal"
          class="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
        >
          <X class="h-5 w-5" />
        </button>
      </div>

      <h3 class="mb-2 text-xl font-bold tracking-tight text-zinc-900">
        {{ game.title }}
      </h3>
      <p class="mb-4 text-sm leading-relaxed text-zinc-600">
        {{ game.description }}
      </p>

      <div class="mb-4 flex flex-wrap gap-1.5">
        <span
          v-for="tag in game.tags"
          :key="tag"
          class="rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600"
        >
          {{ tag }}
        </span>
      </div>

      <div class="mb-6 rounded-xl border border-zinc-100 bg-zinc-50 p-3.5 text-xs leading-relaxed text-zinc-600">
        <strong class="mb-1 block font-semibold text-zinc-900">Catatan di Balik Layar:</strong>
        {{ game.notes }}
      </div>

      <div class="flex gap-3">
        <a
          :href="game.demoUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-zinc-900 py-2.5 text-xs font-medium text-white transition-colors hover:bg-zinc-800"
        >
          <Play class="h-3.5 w-3.5 fill-current" />
          Mainkan
        </a>
        <a
          :href="game.repoUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-zinc-200 bg-white py-2.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
        >
          <Github class="h-3.5 w-3.5" />
          Lihat GitHub
        </a>
      </div>
    </div>
  </div>
</template>