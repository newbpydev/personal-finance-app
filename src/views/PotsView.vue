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
    </main>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/utils' as u;

header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    //height: 4rem;


}

</style>
