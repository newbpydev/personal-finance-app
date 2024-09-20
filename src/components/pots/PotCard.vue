<script lang="ts" setup>

import type { Pot } from '@/types/finance.type'
import ActionButton from '@/components/buttons/ActionButton.vue'

defineProps<{
    pot: Pot
}>()

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

        </div>

        <footer class="card__action-buttons">

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
}

</style>
