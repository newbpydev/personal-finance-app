<script lang="ts" setup>
import CaretDown from '@/assets/images/icon-caret-down.svg'
import SortByIcon from '@/assets/images/icon-sort-mobile.svg'
import FilterIcon from '@/assets/images/icon-filter-mobile.svg'
import { ref } from 'vue'

const model = defineModel('value', { type: String })
defineProps<{
    label: string,
    options: string[],
    type: 'sort' | 'filter'
}>()

const isOpened = ref(true)

const handleClick = (value?: string) => {
    if (value)
        model.value = value
    isOpened.value = !isOpened.value

}
</script>

<template>
    <div class="select-field">
        <div class="select-label" @click="() => isOpened = !isOpened">
            <span class="text">{{ label }}</span>
            <div class="select">
                <span>{{ model }}</span>
                <CaretDown :class="{'icon': true, 'flip': isOpened }" />
            </div>
        </div>
        <SortByIcon v-if="type === 'sort'" class="mobile-icon" @click="() => isOpened = !isOpened" />
        <FilterIcon v-if="type === 'filter'" class="mobile-icon" @click="() => isOpened = !isOpened" />

        <ul v-show="isOpened" class="option-list">
            <li v-for="option in options" :key="option" :class="{'list-item': true, 'active': model === option }"
                @click="handleClick(option)">
                {{ option }}
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
@use "@/assets/styles/utils" as u;

.select-field {
    flex-direction: column;
    width: fit-content;
    position: relative;

    & .text {
        @include u.text-preset-4();
        color: var(--c-grey-500);
    }

}

.select-label {
    //display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: var(--spacing-2);
    cursor: pointer;

    @include u.responsive(display, none, flex);
}

.mobile-icon {
    cursor: pointer;
    @include u.responsive(display, block, none);

}

.select {
    display: flex;
    align-items: center;
    gap: var(--spacing-4);
    background: var(--c-white);
    padding: 1.2rem 2rem;
    border-radius: var(--spacing-2);
    border: 1px solid var(--c-beige-500);
    cursor: pointer;
    position: relative;
    transition: all .2s;

    &-model {
        width: 6ch;
    }

    &:hover {
        color: var(--c-grey-900);
        border: 1px solid var(--c-grey-500);
    }

    //& .searchbar {
    //    outline: none;
    //    width: 100%;
    //
    //    &::placeholder {
    //        color: var(--c-beige-500);
    //    }
    //
    //    &:focus {
    //        color: var(--c-grey-900);
    //        //outline: 1px solid var(--c-grey-500);
    //    }
    //}
}

.option-list {
    position: absolute;
    right: 0;
    width: 11.4rem;
    background: var(--c-white);
    padding: var(--spacing-3) var(--spacing-5);
    border-radius: var(--spacing-2);
    box-shadow: 0 .4rem 2.4rem 0 rgba(0, 0, 0, .25);
    cursor: pointer;
    //top: 6rem;
    @include u.responsive(top, 4.8rem, 6rem);

    & .list-item {

        &.active {
            @include u.text-preset-4-bold();
        }
    }
}

.icon {
    transition: rotate .2s;

    &.flip {
        rotate: 180deg;
    }
}

</style>
