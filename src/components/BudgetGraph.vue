<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { useBudgetsStore } from '@/stores/budgets'
import { formatCurrency } from '@/utils/currency'


const budgetsStore = useBudgetsStore()

const currentSpent = budgetsStore.getBudgetSpent

const totalValue = budgetsStore.getMaxBudgetLimit

const slices = computed(() => {
    let startAngle = 0
    return budgetsStore.budgets.map((budget, i, arr) => {
        const start = startAngle
        const value = (budget.maximum / totalValue) * 360 // convert percentage to degrees
        startAngle += value
        return {
            ...budget,
            startAngle: start,
            endAngle: arr.length - 1 !== i ? startAngle : 360
        }
    })
})

const conicGradient = computed(() => {
    const degreeString = slices.value.reduce((acc, slice) => acc + `${slice.theme} ${slice.startAngle}deg, ${slice.theme} ${slice.endAngle}deg, `, '').slice(0, -2)
    return `conic-gradient(${degreeString.trimEnd()})`
})

onMounted(() => {
})
</script>

<template>
    <div :style="{backgroundImage: conicGradient}"
         class="pie-graph">
        <div class="pie-graph__halo">
            <div class="pie-graph__text-container">
                <div class="pie-graph__text-content">
                    <span class="spent">{{ formatCurrency(currentSpent) }}</span>
                    <span class="limit">of {{ formatCurrency(budgetsStore.getMaxBudgetLimit) }} limit</span>
                </div>
            </div>
        </div>

    </div>

</template>

<style lang="scss" scoped>
@use "@/assets/styles/utils.scss" as u;

.pie-graph {
    width: 24rem;
    height: 24rem;
    background-color: yellow;
    border-radius: 50%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    &__halo {
        width: 18.75rem;
        height: 18.75rem;
        background: rgba(255, 255, 255, .25);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    &__text-container {
        background: rgba(255, 255, 255);
        width: 16.2rem;
        height: 16.2rem;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    &__text-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: var(--spacing-2);

        & .spent {
            @include u.text-preset-1();

        }

        & .limit {
            @include u.text-preset-5();
            color: var(--c-grey-500);
        }
    }
}
</style>
