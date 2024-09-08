<script lang="ts" setup>
import CardWrapper from '@/components/CardWrapper.vue'
import { useBalanceStore } from '@/stores/balance'
import { computed, onBeforeMount, onMounted } from 'vue'
import { formatCurrency } from '@/utils/currency'
import { usePotsStore } from '@/stores/pots'
import { useTransactionStore } from '@/stores/transactions'
import OverviewPots from '@/components/OverviewPots.vue'
import OverviewTransactionList from '@/components/OverviewTransactionList.vue'
import { useBudgetsStore } from '@/stores/budgets'
import OverviewBudgets from '@/components/OverviewBudgets.vue'
import OverviewRecurringBills from '@/components/OverviewRecurringBills.vue'


const balanceStore = useBalanceStore()
const potsStore = usePotsStore()
const transactionsStore = useTransactionStore()
const budgetsStore = useBudgetsStore()

const lastFiveTransactions = computed(() => transactionsStore.transactions.slice(0, 5))

onBeforeMount(() => {
    balanceStore.fetchBalance()
    potsStore.fetchPots()
    transactionsStore.fetchTransactions()
    budgetsStore.fetchBudgets()
})

onMounted(() => {

})
</script>

<template>
    <main class="container overview-page">
        <h1>Overview</h1>

        <div v-if="balanceStore.balance" class="overview-stats">
            <card-wrapper :is-dark="true" :is-stat="true" title="Current Balance">
                <template #default>
                    <span>{{ formatCurrency(balanceStore.balance.current) }}</span>
                </template>
            </card-wrapper>
            <card-wrapper :is-dark="false" :is-stat="true" title="Income">
                <template #default>
                    <span>{{ formatCurrency(balanceStore.balance.income) }}</span>
                </template>
            </card-wrapper>
            <card-wrapper :is-dark="false" :is-stat="true" title="Expenses">
                <template #default>
                    <span>{{ formatCurrency(balanceStore.balance.expenses) }}</span>
                </template>
            </card-wrapper>
        </div>
        <!--    TODO: Review the loading element-->
        <div v-else>Loading Balance</div>

        <div class="overview-wrapper">
            <div class="col-1">
                <OverviewPots />

                <div class="overview-transactions">
                    <card-wrapper gap="md" link-title="View All" title="Transactions" to="/transactions">
                        <OverviewTransactionList :transactions="lastFiveTransactions" />
                    </card-wrapper>
                </div>
            </div>

            <div class="col-2">
                <OverviewBudgets />

                <div class="overview-recurring">
                    <card-wrapper gap="sm" link-title="See Details" title="Recurring Bills"
                                  to="/recurring-bills">
                        <OverviewRecurringBills />
                    </card-wrapper>
                </div>
            </div>
        </div>
    </main>
</template>

<style lang="scss">
@use "../assets/styles/utils" as u;

.overview {
    &-page {
        display: flex;
        flex-direction: column;
        flex: 1 0 0;
        gap: var(--spacing-8);
    }

    &-stats {
        display: flex;
        @include u.responsive(flex-direction, column, row);

        & {
            @include u.responsive(gap, var(--spacing-3), var(--spacing-6));
        }
    }

    &-wrapper {
        display: flex;
        gap: var(--spacing-6);
        @include u.responsive(flex-direction, column, null, row);

        & .col-1 {
            display: flex;
            flex-direction: column;
            //@include u.responsive(width, 100%, null, 60.8rem);
            @include u.responsive(gap, var(--spacing-4), var(--spacing-6));
        }

        & .col-2 {
            display: flex;
            flex-direction: column;
            flex: 1 0 0;
            //width: 100%;
            @include u.responsive(gap, var(--spacing-4), var(--spacing-6));
        }
    }
}
</style>
