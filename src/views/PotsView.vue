<script lang="ts" setup>

import TheButton from '@/components/buttons/TheButton.vue'
import { usePotsStore } from '@/stores/pots'
import { onMounted } from 'vue'
import PotCard from '@/components/pots/PotCard.vue'

const potsStore = usePotsStore()

onMounted(() => {
    potsStore.fetchPots()
})

</script>

<template>
    <main class="container pots-page">
        <header>
            <h1>Pots</h1>
            <TheButton variant="primary">
                + Add New Budget
            </TheButton>
        </header>

        <div class="cards">
            <PotCard v-for="pot in potsStore.pots" :key="pot.id" :pot="pot" />
        </div>
    </main>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/utils' as u;

header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--spacing-8);

}

.cards {
    display: grid;
    //grid-template-columns: 1fr;
    gap: var(--spacing-6);
    @include u.responsive(grid-template-columns, 1fr, null, 1fr 1fr);
}

</style>
