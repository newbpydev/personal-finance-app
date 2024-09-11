<script lang="ts" setup>
import RecurringBillsIcon from '@/components/icons/RecurringBillsIcon.vue'
</script>

<template>
    <div class="card">
        <RecurringBillsIcon class="card-icon" />

        <div class="card-info">
            <span class="text">Total Bills</span>
            <span class="value">$384.98</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/utils" as u;

.card {
    display: flex;
    background: var(--c-grey-900);
    color: var(--c-white);
    border-radius: var(--spacing-3);
    @include u.responsive(gap, var(--spacing-5), var(--spacing-8));
    @include u.responsive(padding, 2.4rem 2rem, 2.4rem);
    @include u.responsive(flex-direction, row, column);
    @include u.responsive(align-items, center, start);
    margin-bottom: 1.2rem;

    @media (min-width: 37.5rem) {
        margin-bottom: 0;
    }

    &-icon {
        height: 4rem;
        width: 4rem;
        stroke: white;
        color: white;
    }

    &-info {
        display: flex;
        flex-direction: column;
        gap: 1.1rem;

        & .text {
            @include u.text-preset-4();
        }

        & .value {
            @include u.text-preset-1();
        }
    }
}

</style>
