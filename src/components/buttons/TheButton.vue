<script lang="ts" setup>
defineProps<{
    variant: 'primary' | 'secondary' | 'destroy'
}>()
</script>

<template>
    <button :class="['btn', variant ]">
        <slot />
    </button>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/utils' as u;

.btn {
    display: flex;
    justify-content: space-evenly;
    padding: var(--spacing-4);
    border-radius: var(--spacing-2);
    color: var(--c-white);

    transition: all .2s;
    @include u.text-preset-4-bold();


    &.primary {
        background: var(--c-grey-900);

        &:hover {
            background: var(--c-grey-500);
        }
    }

    &.secondary {
        color: var(--c-grey-900);
        background: var(--c-beige-100);
        border: 1px solid var(--c-beige-100);
        //transition: all 2s;

        &:hover {
            background: var(--c-white);
            border: 1px solid var(--c-beige-500);
        }
    }

    &.destroy {
        background: var(--c-theme-red);

        &:hover {
            background: rgba(201, 71, 54, .7);
        }
    }

}

</style>
