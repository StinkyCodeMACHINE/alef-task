<script setup>
import Data_Form from "./components/Data_Form.vue";
import Preview from "./components/Preview.vue";


</script>

<template>
  <header class="header">
    <img src="/assets/logo.svg" alt="logo" />
    <div class="header__page-selection-container">
      <div @click="$store.commit('changeIsPreview', false)">Форма</div>
      <div @click="$store.commit('changeIsPreview', true)">Превью</div>
    </div>
  </header>
  <main>
    <Data_Form v-if="!$store.state.isPreview"/>
    <Preview v-else/> 
  </main>
  <footer><div>all rights reserved</div></footer>
</template>
