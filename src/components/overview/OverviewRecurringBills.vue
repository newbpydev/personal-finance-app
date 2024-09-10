<script lang="ts" setup>

import { useRecurringBillsStore } from '@/stores/recurring-bills'
import { onMounted } from 'vue'

// TODO: REWIRE THE RECURRING VALUE
const recurringBillsStore = useRecurringBillsStore()

onMounted(() => {
})
</script>

<template>
    <div class="bills-wrapper">
        <div class="bills-item paid">
            <span class="text">Paid Bills</span>
            <span class="value">$190.00</span>
        </div>
        <div class="bills-item total">
            <span class="text">Total Upcoming</span>
            <span class="value">$194.00</span>
        </div>
        <div class="bills-item due">
            <span class="text">Due Soon</span>
            <span class="value">$59.98</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/utils" as u;

.bills {
    &-wrapper {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-3);
    }

    &-item {
        display: flex;
        justify-content: space-between;
        padding: var(--spacing-5) var(--spacing-4);
        background: var(--c-beige-100);
        border-radius: var(--border-radius-sm);

        &.paid {
            border-left: var(--spacing-1) solid var(--c-theme-green);
        }

        &.total {
            border-left: var(--spacing-1) solid var(--c-theme-yellow);
        }

        &.due {
            border-left: var(--spacing-1) solid var(--c-theme-cyan);
        }

        & .text {
            @include u.text-preset-4();

            &.bills {
                color: var(--c-grey-500);
            }

            &.total {
                color: var(--c)
            }

        }

        & .value {
            @include u.text-preset-4-bold();
        }
    }
}

</style>
