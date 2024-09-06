<script lang="ts" setup>
import { formatCurrency } from '../utils/currency'

defineProps<{
    title: string;
    value: number;
    tagColor: string;
}>()
</script>

<template>
    <div class="stat-highlight">
        <div :style="{backgroundColor: tagColor}" class="stat-highlight__tag"></div>

        <div class="stat-highlight__details">
            <p class="text">{{ title }}</p>
            <p class="value">{{ formatCurrency(value) }}</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/utils.scss' as u;

.stat-highlight {
    display: flex;
    gap: var(--spacing-4);
    flex: 1 0 0;

    &__tag {
        width: .4rem;
        border-radius: var(--spacing-2);
    }

    &__details {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-1);

        & .text {
            @include u.text-preset-5();
            color: var(--c-grey-500);
        }

        & .value {
            @include u.text-preset-4-bold();
        }
    }

}

</style>
