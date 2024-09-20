<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

import EllipsisIcon from '@/assets/images/icon-ellipsis.svg'

const isOpen = ref(false)
const dropdownContainer = ref<HTMLElement | null>(null)

const handleShowAction = () => {
    isOpen.value = !isOpen.value
}

const handleClickOutside = (event: MouseEvent) => {
    if (dropdownContainer.value && !dropdownContainer.value.contains(event.target as Node)) {
        isOpen.value = false
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})
onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
})

</script>

<template>
    <div ref="dropdownContainer" class="wrapper">
        <button aria-label="open menu" class="btn" @click="handleShowAction">
            <EllipsisIcon />
        </button>
        <Transition name="fade">
            <ul v-show="isOpen" class="list">
                <li class="item">Edit Pot</li>
                <li class="item destroy">Delete Pot</li>
            </ul>
        </Transition>
    </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/utils' as u;

.wrapper {
    position: relative;
}

.btn {
    display: flex;
    height: 1.6rem;
    width: 1.6rem;
    align-items: center;
    justify-content: center;
}

.list {
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 0;
    top: 3.6rem;
    padding: var(--spacing-3) var(--spacing-5);
    background: var(--c-white);
    box-shadow: 0 4px 24px 0 rgba(0, 0, 0, .25);
    border-radius: var(--spacing-2);
    //gap: var(--spacing-3);
    width: max-content;

    & .item {
        cursor: pointer;

        &:first-of-type {
            border-bottom: 1px solid var(--c-grey-100);
            padding-bottom: 1.2rem;
        }

        &:last-of-type {
            padding-top: 1.2rem;
        }

        &.destroy {
            color: var(--c-theme-red);
        }
    }

}

</style>
