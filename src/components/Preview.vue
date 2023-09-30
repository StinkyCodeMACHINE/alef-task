<script setup>
import { ref } from "vue";
</script>

<template>
  <div class="preview">
    <div class="preview__data-container">
      <h2>Персональные данные</h2>
      <div class="preview__data-value">
        {{ $store.state.data.parent.name.value }},
        {{ $store.state.data.parent.age.value }}
      </div>
    </div>
    <div class="preview__data-container">
      <h2>Дети</h2>
      <div
        class="preview__data-value kid"
        v-for="(kid, index) in $store.state.data.kids"
      >
        {{ kid.name.value }}, {{ kid.age.value }}
      </div>
    </div>
  </div>
</template>
