<script lang="ts" setup>

import FieldInput from '@/components/inputs/FieldInput.vue'
import { onMounted, ref } from 'vue'
import SelectField from '@/components/inputs/SelectField.vue'
import { useRecurringBillsStore } from '@/stores/recurring-bills'

const searchInput = ref('')
const sortBy = ref('Latest')
const sortOptions = [
    'Latest',
    'Oldest',
    'A to Z',
    'Highest',
    'Lowest'
]

const recurringBillsStore = useRecurringBillsStore()

onMounted(() => {
    // recurringBillsStore.updateRecurringBills()
})

</script>

<template>
    <section class="bills">
        <div class="search-options">
            <FieldInput v-model:value="searchInput" is-searchbar placeholder="Search bills" />
            <SelectField v-model:value="sortBy" :options="sortOptions" default="Latest" label="Sort by" type="sort" />
        </div>

        <div class="bills-table">
            <ul class="bills-list">
                <li class="list-item">

                </li>
            </ul>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/utils' as u;

.bills {
    background: var(--c-white);
    border-radius: var(--spacing-3);
    @include u.responsive(padding, 2.4rem 2rem, 3.2rem);
}

.search-options {
    display: flex;
    align-items: center;
    justify-content: space-between;
    @include u.responsive(gap, 2.4rem, 0);
}
</style>
