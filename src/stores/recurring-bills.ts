import { defineStore } from 'pinia'
import { onUpdated, ref } from 'vue'
import { useTransactionStore } from '@/stores/transactions'
import type { Transaction } from '@/types/finance.type'

export const useRecurringBillsStore = defineStore('recurring-bills', () => {
  const transitionsStore = useTransactionStore()

  const recurringBills = ref<Transaction[]>([])

  const updateRecurringBills = () => {
    recurringBills.value = transitionsStore.transactions.filter(t => t.recurring)
    console.log('updating', recurringBills.value)
  }

  onUpdated(() => {
    console.log(recurringBills.value)
  })

  return {
    recurringBills,
    updateRecurringBills
  }
})
