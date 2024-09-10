import { defineStore } from 'pinia'
import { onUpdated, ref } from 'vue'
import { useTransactionStore } from '@/stores/transactions'
import type { Transaction } from '@/types/finance.type'

export const useRecurringBillsStore = defineStore('recurring-bills', () => {
  const transactionsStore = useTransactionStore()

  const recurringBills = ref<Transaction[]>([])

  const updateRecurringBills = () => {
    recurringBills.value = transactionsStore.transactions.filter(t => t.recurring)
  }

  onUpdated(() => {
    console.log(recurringBills.value)
  })

  return {
    recurringBills,
    updateRecurringBills
  }
})
