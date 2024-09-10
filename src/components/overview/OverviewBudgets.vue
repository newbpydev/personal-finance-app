<script lang="ts" setup>

import CardWrapper from '@/components/CardWrapper.vue'
import { useBudgetsStore } from '@/stores/budgets'
import { onBeforeMount, onMounted } from 'vue'
import StatHighlight from '@/components/StatHighlight.vue'
import BudgetGraph from '@/components/BudgetGraph.vue'

const budgetsStore = useBudgetsStore()

const budgets = [
    { theme: '#FF6384', category: 'Food', value: 150 },
    { theme: '#36A2EB', category: 'Transport', value: 100 },
    { theme: '#FFCE56', category: 'Entertainment', value: 50 }
]
const totalLimit = 975
const currentSpent = 338

onBeforeMount(() => {
})

onMounted(() => {
})
</script>

<template>
    <card-wrapper gap="sm" link-title="See Details" title="Budgets" to="/budgets">
        <div class="info">
            <div v-if="!budgetsStore.loading" class="col-1">
                <BudgetGraph />
            </div>

            <div class="col-2">
                <StatHighlight v-for="budget of budgetsStore.budgets.slice(0, 4)" :key="budget.id"
                               :tag-color="budget.theme"
                               :title="budget.category" :value="budget.maximum" />
            </div>
        </div>
    </card-wrapper>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/utils.scss' as u;

.info {
    display: flex;
    gap: var(--spacing-4);
    @include u.responsive(flex-direction, column, row);
    padding: var(--spacing-2) 0;

    & .col-1 {
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1 0 0;
    }

    & .col-2 {
        display: grid;
        //grid-template-columns: repeat(2, 1fr);
        grid-gap: var(--spacing-4);
        @include u.responsive(grid-template-columns, repeat(2, 1fr), 1fr);
        @include u.responsive(max-width, null, 10.1rem);
        //grid-auto-flow: column;
    }
}

</style>
