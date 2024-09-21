<script lang="ts" setup>

import type { Pot } from '@/types/finance.type'
import ActionButton from '@/components/buttons/ActionButton.vue'
import TheButton from '@/components/buttons/TheButton.vue'
import { formatCurrency } from '@/utils/currency'
import { computed } from 'vue'

const props = defineProps<{
    pot: Pot
}>()

const percentage = computed(() => {
    return ((props.pot.total / props.pot.target) * 100).toFixed(2)
})

</script>

<template>
    <article class="card">
        <header class="card__header">
            <div class="card__title-wrapper">
                <i :style="{background: pot.theme}" class="icon"></i>
                <h1 class="title">{{ pot.name }}</h1>
            </div>

            <ActionButton />
        </header>

        <div class="card__stats">
            <div class="total">
                <span class="text">Total Saved</span>
                <span class="value">{{ formatCurrency(pot.total) }}</span>
            </div>

            <div class="progress">
                <div class="progressbar" role="progressbar">
                    <div :style="{width: `${percentage}%`, background: pot.theme}" class="progressbar-value"
                         role="progressbar"></div>
                </div>

                <div class="stat">
                    <span class="percentage">{{ percentage }}%</span>
                    <span class="target">Target of {{ formatCurrency(pot.target).slice(0, -3) }}</span>
                </div>
            </div>

        </div>

        <footer class="card__action-buttons">
            <TheButton class="btn" variant="secondary">+ Add Money</TheButton>
            <TheButton class="btn" variant="secondary">Withdraw</TheButton>
        </footer>
    </article>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/utils" as u;

.card {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-8);
    border-radius: var(--spacing-3);
    padding: 2.4rem 2rem;
    background: var(--c-white);

    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &__title-wrapper {
        display: flex;
        align-items: center;
        gap: 1.6rem;

        & .icon {
            display: block;
            border-radius: 50%;
            height: 1.6rem;
            width: 1.6rem;
        }

        & .title {
            @include u.text-preset-2();
        }
    }

    &__stats {
        display: flex;
        flex-direction: column;
        gap: 1.6rem;

        & .total {
            display: flex;
            justify-content: space-between;
            align-items: center;

            & .text {
                color: var(--c-grey-500);
                @include u.text-preset-4();
            }

            & .value {
                @include u.text-preset-1();
            }
        }

        & .progress {
            display: flex;
            flex-direction: column;
            gap: 1.3rem;
            color: var(--c-grey-500);

            & .progressbar {
                height: .8rem;
                background: var(--c-beige-100);
                border-radius: .4rem;

                &-value {
                    height: 100%;
                    border-radius: .4rem;
                }
            }

            & .percentage {
                @include u.text-preset-5-bold()
            }

            & .stat {
                display: flex;
                align-items: center;
                justify-content: space-between;
                @include u.text-preset-5();
            }
        }
    }

    &__action-buttons {
        display: flex;
        gap: 1.6rem;

        & .btn {
            width: 100%;
        }

    }
}

</style>
