<script setup>
import { Code2 } from 'lucide-vue-next';
</script>

<template>
  <section class="rounded-3xl border border-zinc-200/80 bg-zinc-50/70 p-6 sm:p-10">
    <div class="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-start">
      <div class="md:col-span-5">
        <div class="mb-3 inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-600">
          <Code2 class="h-3.5 w-3.5" />
          <span>Tentang gabut-lab</span>
        </div>
        <h1 class="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
          Ruang bebas bereksperimen tanpa beban target.
        </h1>
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
</template>
