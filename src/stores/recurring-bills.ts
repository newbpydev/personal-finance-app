import { defineStore } from 'pinia'
import { onUpdated, ref } from 'vue'
import { useTransactionStore } from '@/stores/transactions'
import type { Transaction } from '@/types/finance.type'
import type { Sort } from '@/types/category.types'

export const useRecurringBillsStore = defineStore('recurring-bills', () => {
  const transactionsStore = useTransactionStore()

  const recurringBills = ref<Transaction[]>([])

  const updateRecurringBills = () => {
    recurringBills.value = transactionsStore.transactions.filter(t => t.recurring)
  }

  const getSortedRecurringBills = (sortBy: Sort) => {
    if (recurringBills.value.length)
      console.log(new Date(recurringBills.value[0].date).getTime())
    switch (sortBy) {
      case 'Oldest':
        return [...recurringBills.value].sort((a: Transaction, b: Transaction) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        })
      case 'A to Z':
        return [...recurringBills.value].sort((a: Transaction, b: Transaction) => a.name.localeCompare(b.name))
      case 'Highest':
        return [...recurringBills.value].sort((a, b) => a.amount - b.amount)
      case 'Lowest':
        return [...recurringBills.value].sort((a, b) => b.amount - a.amount)
      default:
        return [...recurringBills.value].sort((a: Transaction, b: Transaction) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        })
    }
  }

  onUpdated(() => {
    console.log(recurringBills.value)
  })

  return {
    recurringBills,
    getSortedRecurringBills,
    updateRecurringBills
  }
})
