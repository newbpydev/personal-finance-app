<script lang="ts" setup>
import { computed, onMounted } from 'vue'

interface Budget {
    theme: string;
    category: string;
    value: number;
}

// defineProps<{
//     budgets: Budget[],
//     totalLimit: number,
//     currentSpent: number
// }>()

const budgets = [
    { theme: '#FF6384', category: 'Food', value: 150 },
    { theme: '#36A2EB', category: 'Transport', value: 100 },
    { theme: '#FFCE56', category: 'Entertainment', value: 50 }
]
const totalLimit = 975
const currentSpent = 300

const totalValue = computed(() => budgets.reduce((sum, budget) => sum + budget.value), 0)

const segments = computed(() => {
    let cumulativeValue = 0
    return budgets.map(budget => {
        const valuePercentage = (budget.value / totalValue.value) * 100
        console.log(valuePercentage)
        const dasharray = `${valuePercentage} ${100 - valuePercentage}`
        const offset = cumulativeValue
        cumulativeValue += valuePercentage
        return {
            color: budget.theme,
            dasharray,
            offset: /*css*/`calc(${100 - offset} * 31.4 / 100)`
        }
    })
})

const slices = computed(() => {
    let startAngle = 0
    return budgets.map(budget => {
        const start = startAngle
        const value = (budget.value / currentSpent) * 360 // convert percentage to degrees
        startAngle += value
        return {
            ...budget,
            startAngle: start
        }
    })
})

console.log(slices.value)

onMounted(() => {
})
</script>

<template>
    <div :style="{backgroundImage: 'conic-gradient(red 0deg, red 90deg, yellow 90deg, yellow 180deg)'}"
         class="pie-graph">
        <div class="pie-graph__halo">
            <div class="pie-graph__text-container">
                <div class="pie-graph__text-content">
                    <span class="spent">$338</span>
                    <span class="limit">of $900 limit</span>
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
