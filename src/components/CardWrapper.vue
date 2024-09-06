<script lang="ts" setup>
import DetailLink from '@/components/DetailLink.vue'

defineProps<{
    title: string;
    linkTitle?: string;
    to?: string | undefined;
    isDark?: boolean,
    isStat?: boolean,
    gap?: 'sm' | 'md'
}>()

</script>

<template>
    <article :class="{'card-wrapper': true, 'dark': isDark, 'stat': isStat, 'sm': gap === 'sm', 'md': gap === 'md' }">
        <header class="card-header">
            <h1>{{ title }}</h1>
            <DetailLink v-if="to !== undefined" :to="to">
                {{ linkTitle }}
            </DetailLink>
        </header>

        <section class="card-section">
            <slot />
        </section>

    </article>
</template>

<style lang="scss" scoped>
@use '../assets/styles/utils' as u;

.card {
    &-wrapper {
        display: flex;
        flex: 1 0 0;
        flex-direction: column;
        background-color: var(--c-white);
        border-radius: var(--spacing-3);
        @include u.responsive(padding,
          var(--spacing-6) var(--spacing-5),
          var(--spacing-8),
        );

        &.dark {
            background-color: var(--c-grey-900);
            color: var(--c-white);
        }

        &.stat {
            gap: var(--spacing-3);
            @include u.responsive(padding,
              var(--spacing-5),
              var(--spacing-6)
            );

            & .card-header {
                & h1 {
                    @include u.text-preset-4();
                }
            }

            & .card-section {
                @include u.text-preset-1();
            }
        }

        &.sm {
            gap: var(--spacing-5);
        }

        &.md {
            gap: var(--spacing-8);
        }
    }

    &-header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        & h1 {
            @include u.text-preset-2();
        }
    }

    &-section {
    }
}

</style>
