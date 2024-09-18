<script lang="ts" setup>

import TotalBillsCard from '@/components/recurring-bills/TotalBillsCard.vue'
import SummaryCard from '@/components/recurring-bills/SummaryCard.vue'
import RecurringBillsList from '@/components/recurring-bills/RecurringBillsList.vue'
import { useTransactionStore } from '@/stores/transactions'
import { onMounted } from 'vue'
import { useRecurringBillsStore } from '@/stores/recurring-bills'

const transactionsStore = useTransactionStore()
const recurringBillsStore = useRecurringBillsStore()

// const currentPaidBills = computed(() => {
//     return transactionsStore.getTransactionsByDate(5, 2024)
// })
//
// console.log(currentPaidBills.value)

onMounted(() => {
    transactionsStore.fetchTransactions()
    // recurringBillsStore.updateRecurringBills()
})
</script>

<template>
    <main class="container recurring-bills">
        <h1>Recurring Bills</h1>

        <section class="recurring-bills__layout">
            <TotalBillsCard class="total-bills" />
            <SummaryCard class="summary" />
            <RecurringBillsList class="bills" />
        </section>

    </main>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as v;

.recurring-bills {
    & h1 {
        margin-bottom: var(--spacing-8);
    }

    &__layout {
        display: grid;
        grid-template-areas:
        "total-bills"
        "summary"
        "bills";

        @media (min-width: v.$mobile-lg-width) {
            grid-template-columns: repeat(2, 1fr);
            gap: var(--spacing-6);
            grid-template-areas:
              "total-bills summary"
                "bills bills";
        }

        @media (min-width: v.$laptop-lg-width) {
            grid-template-columns: 33.7rem minmax(55rem, auto);
            grid-template-areas:
            "total-bills bills"
            "summary bills";
        }
    }

    & .total-bills {
        grid-area: total-bills;
    }

    & .summary {
        grid-area: summary;
    }

    & .bills {
        grid-area: bills;
    }
}

</style>
