<script lang="ts" setup>

import TheButton from '@/components/buttons/TheButton.vue'
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
            <div class="card">card 1</div>
            <div class="card">card 2</div>
            <div class="card">card 3</div>
            <div class="card">card 4</div>
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
