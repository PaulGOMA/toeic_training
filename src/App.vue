<script setup>
import TitleBar from './components/TitleBar.vue';
import FooterContainer from './components/FooterContainer.vue';
import { RouterView } from 'vue-router';

</script>

<template>
  <div class="app-container">
    <title-bar/>
    <main class="main-content"> 
      <router-view/>
    </main>
    <footer-container/>
  </div>
</template>