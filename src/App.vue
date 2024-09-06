<script lang="ts" setup>
import { RouterView } from 'vue-router'
import SidebarMenu from '@/components/SidebarMenu.vue'
import { useBudgetsStore } from '@/stores/budgets'
import { onMounted } from 'vue'

const budgetsStore = useBudgetsStore()

onMounted(() => {
    // budgetsStore.fetchBudgets()
})

</script>

<template>
    <SidebarMenu />
    <router-view v-slot="{Component}">
        <Transition mode="out-in" name="fade">

            <Component :is="Component" />
        </Transition>
    </router-view>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
