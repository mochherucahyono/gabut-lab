<script setup>
import { onMounted, onUnmounted } from 'vue';
import { X, Play, Github, Sparkles } from 'lucide-vue-next';

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
    role="dialog"
    aria-modal="true"
    class="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/45 p-4 backdrop-blur-xs sm:p-6"
  >
    <div class="relative w-full max-w-lg overflow-hidden rounded-[2rem] border border-zinc-200/90 bg-white p-6 shadow-2xl sm:p-8">
      <!-- Aksen Dekorasi Doodle Halus -->
      <div class="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-amber-100/75" />
      <div class="pointer-events-none absolute -bottom-6 -left-6 h-20 w-20 rounded-2xl bg-sky-100/75" />

      <div class="relative z-10">
        <div class="mb-5 flex items-center justify-between gap-3">
          <div class="flex items-center gap-2">
            <span
              v-if="game?.category"
              class="rounded-full bg-blue-50 px-3.5 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-200/70 sm:text-sm"
            >
              {{ game.category }}
            </span>
            <span class="hidden items-center gap-1 rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 sm:inline-flex">
              <Sparkles class="h-3.5 w-3.5 text-amber-500" />
              gabut.lab
            </span>
          </div>

          <button
            type="button"
            @click="emit('close')"
            aria-label="Tutup modal"
            class="rounded-full border border-zinc-200/80 bg-zinc-50 p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
          >
            <X class="h-5 w-5" />
          </button>
        </div>

        <h3 class="mb-2.5 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
          {{ game?.title || 'Tanpa Judul' }}
        </h3>

        <p class="mb-5 text-sm leading-relaxed text-zinc-600 sm:text-base">
          {{ game?.description || '' }}
        </p>

        <div v-if="Array.isArray(game?.tags) && game.tags.length > 0" class="mb-5 flex flex-wrap gap-2">
          <span
            v-for="tag in game.tags"
            :key="tag"
            class="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 sm:text-sm"
          >
            {{ tag }}
          </span>
        </div>

        <div v-if="game?.notes" class="mb-7 rounded-2xl border border-amber-200/60 bg-amber-50/70 p-4 text-sm leading-relaxed text-zinc-700 sm:p-5 sm:text-[15px]">
          <strong class="mb-1.5 block font-bold text-zinc-900">Catatan di Balik Layar:</strong>
          <span>{{ game.notes }}</span>
        </div>

        <div class="flex flex-col gap-3 sm:flex-row">
          <a
            v-if="game?.demoUrl"
            :href="game.demoUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-xs transition-all hover:bg-blue-700 active:scale-95"
          >
            <Play class="h-4 w-4 fill-current" />
            <span>Mainkan</span>
          </a>

          <a
            v-if="game?.repoUrl"
            :href="game.repoUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-700 transition-all hover:border-zinc-300 hover:bg-zinc-50 active:scale-95"
          >
            <Github class="h-4 w-4" />
            <span>Lihat GitHub</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>