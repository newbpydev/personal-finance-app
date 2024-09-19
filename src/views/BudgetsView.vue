<script lang="ts" setup>

import TheButton from '@/components/buttons/TheButton.vue'
</script>

<template>
    <main class="container budgets-page">
        <header>
            <h1>Budget</h1>
            <TheButton variant="primary">
                + Add New Budget
            </TheButton>

        </header>
    </main>
</template>

<style lang="scss" scoped>
header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>
