<script lang="ts" setup>

import FieldInput from '@/components/inputs/FieldInput.vue'
import { computed, onMounted, ref } from 'vue'
import SelectField from '@/components/inputs/SelectField.vue'
import { useRecurringBillsStore } from '@/stores/recurring-bills'
import { getDay } from '@/utils/dates'
import { formatCurrency } from '@/utils/currency'
import { useTransactionStore } from '@/stores/transactions'

import PaidIcon from '@/assets/images/icon-bill-paid.svg'
import DueIcon from '@/assets/images/icon-bill-due.svg'
import type { RecurringTransaction } from '@/types/finance.type'

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
const transactionsStore = useTransactionStore()
const currentBillsPaid = computed(() => {
    return transactionsStore.getTransactionsByDate(5, 2024)
})

const isPastDate = (bill: RecurringTransaction) => {
    const bDate = new Date(bill.date)
    const todayDate = new Date()

    
}

// watch(sortBy, () => {
//     // recurringBillsStore.sortRecurringBills(sortBy.value)
// })

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

        <div class="table-header">
            <span class="title">Bill Title</span>
            <span class="due">Due Date</span>
            <span class="amount">Amount</span>
        </div>

        <div class="bills-table">
            <ul class="bills-list">
                <li v-for="bill in recurringBillsStore.getSortedRecurringBills(sortBy)" :key="bill.id"
                    class="list-item">
                    <div class="title">
                        <div class="icon">
                            <img :alt="`avatar of ${bill.name}`" :src="bill.avatar">
                        </div>
                        <span class="text">{{ bill.name }}</span>
                    </div>
                    <div class="date-amount">
                        <span :class="{'date': true, 'paid': bill.isPaid }">Monthly - {{ getDay(bill.date) }}
                            <i class="status-icon">
                            <PaidIcon v-if="bill.isPaid" />
                            <DueIcon v-if="!bill.isPaid && bill.isDue" />
                        </i>
                        </span>
                        <span
                          :class="{'amount': true, 'due': bill.isDue && !bill.isPaid }">{{ formatCurrency(Math.abs(bill.amount))
                            }}</span>
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/utils' as u;
@use "@/assets/styles/variables" as v;

.bills {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-6);
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

.table-header {
    display: none;
    gap: var(--spacing-8);
    color: var(--c-grey-500);
    padding: var(--spacing-3) 0;
    border-bottom: 1px solid var(--c-grey-100);
    @include u.text-preset-5();
    @media (min-width: v.$mobile-lg-width) {
        display: flex;
    }

    & .title {
        flex: 1 0 0;
    }

    & .due {
        width: 12rem;
    }

    & .amount {
        width: 10rem;
        text-align: right;
    }
}

.bills-table {
    & .bills-list {
        & .list-item {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-2);
            border-bottom: 1px solid var(--c-grey-100);
            padding: 2rem 0;
            @media (min-width: v.$mobile-lg-width) {
                flex-direction: row;
                gap: var(--spacing-8);
            }

            &:first-of-type {
                padding-top: 0;
            }

            &:last-of-type {
                padding-bottom: 0;
                border-bottom: none;
            }

            & .title {
                display: flex;
                align-items: center;
                gap: var(--spacing-4);
                flex: 1 0 0;

                & .icon {
                    display: block;
                    width: 3.2rem;
                    height: 3.2rem;

                    & img {
                        display: block;
                        border-radius: 50%;

                    }
                }

                & .text {
                    @include u.text-preset-4-bold();
                }
            }

            & .date-amount {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: var(--spacing-8);
                @media (min-width: v.$mobile-lg-width) {
                    justify-content: normal;
                }

                & .date {
                    display: inline-block;
                    width: 12rem;
                    color: var(--c-grey-500);
                    @include u.text-preset-5();

                    &.paid {
                        color: var(--c-theme-green);

                    }
                }

                & .amount {
                    display: inline-block;
                    width: 10rem;
                    text-align: right;
                    @include u.text-preset-4-bold();

                    &.due {
                        color: var(--c-theme-red);
                    }
                }
            }
        }
    }
}
</style>
