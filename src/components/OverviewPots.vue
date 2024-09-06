<script lang="ts" setup>

import CardWrapper from '@/components/CardWrapper.vue'
import { usePotsStore } from '@/stores/pots'
import PotIcon from '@/components/icons/PotIcon.vue'
import StatHighlight from '@/components/StatHighlight.vue'
import { formatCurrency } from '../utils/currency'

const potsStore = usePotsStore()

</script>

<template>
    <card-wrapper :is-dark="false" :is-stat="false" gap="sm" link-title="See Details"
                  title="Pots" to="/pots">
        <div class="card-info">
            <div class="card-total">
                <PotIcon />
                <div class="details">
                    <span class="text">Total Saved</span>
                    <span class="value">{{ formatCurrency(potsStore.getTotalSaved) }}</span>
                </div>
            </div>

            <div class="card-categories">
                <StatHighlight v-for="pot in potsStore.pots.slice(0, 4)" :key="pot.id" :tag-color="pot.theme"
                               :title="pot.name"
                               :value="pot.total" />
            </div>
        </div>
    </card-wrapper>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/utils.scss' as u;

.card {
    &-info {
        display: flex;
        gap: var(--spacing-5);
        @include u.responsive(flex-direction, column, row);
    }

    &-total {
        display: flex;
        min-width: 24.7rem;
        gap: var(--spacing-4);
        align-items: center;
        padding: var(--spacing-4);
        background-color: var(--c-beige-100);
        border-radius: var(--spacing-3);

        & svg {
            fill: var(--c-theme-green);
            height: 4rem;
            width: 4rem;
        }

        & .details {
            display: flex;
            flex-direction: column;
            gap: 1.1rem;

            & .text {
                @include u.text-preset-4();
                color: var(--c-grey-500);
            }

            & .value {
                @include u.text-preset-1();
            }

        }
    }

    &-categories {
        width: 100%;
        display: grid;
        gap: var(--spacing-4);
        grid-template-rows: repeat(2, auto);
        grid-auto-flow: column;
    }
}

</style>
