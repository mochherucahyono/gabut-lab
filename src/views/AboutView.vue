<script setup>
import { Code2, Sparkles, Compass, GitBranch } from 'lucide-vue-next';
</script>

<template>
  <section class="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
    <div class="relative overflow-hidden rounded-[2rem] border border-zinc-200/80 bg-white p-7 shadow-[0_6px_30px_-10px_rgba(0,0,0,0.08)] sm:p-12">
      <!-- Elemen Dekorasi Latar Halus Khas Doodle -->
      <div class="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-amber-100/75" />
      <div class="pointer-events-none absolute -bottom-8 left-12 h-24 w-24 rounded-3xl bg-sky-100/75" />
      <div class="pointer-events-none absolute bottom-8 right-24 hidden h-12 w-12 rounded-full bg-emerald-100/80 md:block" />

      <div class="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-12 md:items-start md:gap-10">
        <!-- Kolom Kiri -->
        <div class="md:col-span-5">
          <div class="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-200/90 bg-zinc-50 px-4 py-1.5 text-xs font-semibold text-zinc-700 sm:text-sm">
            <Code2 class="h-4 w-4 text-blue-600" />
            <span>Tentang gabut.lab</span>
          </div>

          <h1 class="mb-5 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl sm:leading-[1.18] lg:text-[2.65rem]">
            Ruang bebas bereksperimen
            <span class="relative inline-block">
              tanpa beban target.
              <span class="absolute bottom-0.5 left-0 -z-10 h-2.5 w-full rounded-full bg-emerald-200/90" />
            </span>
          </h1>

          <div class="flex flex-wrap gap-2.5">
            <span class="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3.5 py-1.5 text-xs font-medium text-blue-700 sm:text-sm">
              <Compass class="h-3.5 w-3.5" />
              Eksplorasi Bebas
            </span>
            <span class="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3.5 py-1.5 text-xs font-medium text-amber-700 sm:text-sm">
              <Sparkles class="h-3.5 w-3.5" />
              Main Langsung
            </span>
            <span class="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3.5 py-1.5 text-xs font-medium text-rose-700 sm:text-sm">
              <GitBranch class="h-3.5 w-3.5" />
              Kode Terbuka
            </span>
          </div>
        </div>

        <!-- Kolom Kanan: Narasi Utama -->
        <div class="space-y-5 rounded-3xl border border-zinc-100 bg-zinc-50/70 p-6 text-base leading-relaxed text-zinc-700 sm:p-8 sm:text-lg md:col-span-7">
          <p>
            Tidak semua proyek harus lahir dari dokumen spesifikasi panjang atau orientasi komersial. Sering kali ide paling seru justru muncul saat mengulik API browser, menyusun logika permainan sederhana, atau mengisi waktu luang.
          </p>
          <p>
            Setiap entri di halaman ini sengaja dibuat ringan agar bisa langsung dicoba lewat tautan demo dan dipelajari struktur kodenya lewat repositori GitHub masing-masing.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>