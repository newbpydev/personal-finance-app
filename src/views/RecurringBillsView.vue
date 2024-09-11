<script lang="ts" setup>

import TotalBillsCard from '@/components/recurring-bills/TotalBillsCard.vue'
import SummaryCard from '@/components/recurring-bills/SummaryCard.vue'
import RecurringBillsList from '@/components/recurring-bills/RecurringBillsList.vue'
import { useTransactionStore } from '@/stores/transactions'
import { onMounted } from 'vue'
import { useRecurringBillsStore } from '@/stores/recurring-bills'

const transactionsStore = useTransactionStore()
const recurringBillsStore = useRecurringBillsStore()

onMounted(() => {
    transactionsStore.fetchTransactions()
    recurringBillsStore.updateRecurringBills()
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

        @media (min-width: 37.5em) {
            grid-template-columns: repeat(2, 1fr);
            gap: var(--spacing-6);
            grid-template-areas:
              "total-bills summary"
                "bills bills";
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
