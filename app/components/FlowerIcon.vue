<script setup lang="ts">
// Цветок сакуры 🌸: пять лепестков с вырезом на кончике и тычинки в центре.
// Цвет лепестков берётся из currentColor (text-* класс), outline — только контур.
withDefaults(defineProps<{ size?: number; outline?: boolean }>(), { size: 44, outline: false })

const petals = [0, 72, 144, 216, 288]
const stamens = [36, 108, 180, 252, 324]
const PETAL = 'M0 -2.5C-8.5 -6 -11 -17 -4.2 -20.8C-2.4 -21.8 -0.9 -20.5 0 -18.2C0.9 -20.5 2.4 -21.8 4.2 -20.8C11 -17 8.5 -6 0 -2.5Z'
</script>

<template>
  <svg :width="size" :height="size" viewBox="-22 -22 44 44" aria-hidden="true" focusable="false">
    <g v-for="a in petals" :key="a" :transform="`rotate(${a})`">
      <path
        :d="PETAL" stroke-linejoin="round"
        :fill="outline ? 'none' : 'currentColor'" :stroke="outline ? 'currentColor' : 'none'" :stroke-width="outline ? 1.2 : 0"
      />
      <path v-if="!outline" d="M0 -5 0 -15" stroke="#fff" stroke-opacity=".4" stroke-width="1" stroke-linecap="round" />
    </g>
    <g v-for="a in stamens" :key="a" :transform="`rotate(${a})`" :stroke="outline ? 'currentColor' : '#B8607B'" stroke-width="1" stroke-linecap="round">
      <path d="M0 0 0 -7" />
      <circle cx="0" cy="-8" r="1.2" :fill="outline ? 'currentColor' : '#8E3F59'" stroke="none" />
    </g>
    <circle r="2.4" :fill="outline ? 'none' : '#B8607B'" :stroke="outline ? 'currentColor' : 'none'" stroke-width="1" />
  </svg>
</template>
