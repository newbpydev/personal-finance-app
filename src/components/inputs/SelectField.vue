<script lang="ts" setup>
const model = defineModel('value', { type: String })
defineProps<{
    placeholder: string
    isSearchbar?: boolean
    isCurrency?: boolean
}>()

import SearchIcon from '@/assets/images/icon-search.svg'
</script>

<template>
    <label class="input-field">
        <span v-if="isCurrency && !isSearchbar" class="dollar-sign">$</span>
        <input v-if="isCurrency" id="currency" v-model="model" class="searchbar" name="currency" step=".01"
               type="number">
        <input v-else v-model="model" :placeholder="placeholder" class="searchbar" type="text">
        <SearchIcon v-if="isSearchbar && !isCurrency" class="search-icon" />
    </label>
</template>

<style lang="scss" scoped>
.input-field {
}

.input-field {
    display: flex;
    align-items: center;
    gap: var(--spacing-4);
    background: var(--c-white);
    padding: 1.2rem 2rem;
    border-radius: var(--spacing-2);
    border: 1px solid var(--c-beige-500);
    transition: all .2s;

    &:hover {
        color: var(--c-grey-900);
        border: 1px solid var(--c-grey-500);
    }

    &:has(.searchbar:focus) {
        border: 1px solid var(--c-grey-900);
    }

    & .searchbar {
        outline: none;
        width: 100%;

        &::placeholder {
            color: var(--c-beige-500);
        }

        &:focus {
            color: var(--c-grey-900);
            //outline: 1px solid var(--c-grey-500);
        }

    }

}

.search-icon {
}

.dollar-sign {
}

</style>
