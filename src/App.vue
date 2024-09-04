<script lang="ts" setup>
import { RouterView } from 'vue-router'
import SidebarMenu from '@/components/SidebarMenu.vue'
</script>

<template>
  <SidebarMenu />
  <Transition mode="in-out" name="fade">
    <router-view />
  </Transition>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
