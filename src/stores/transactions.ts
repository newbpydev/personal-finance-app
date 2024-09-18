import { defineStore } from 'pinia'
import { onUpdated, ref, watch } from 'vue'
import type { Transaction } from '@/types/finance.type'
import { useRecurringBillsStore } from '@/stores/recurring-bills'

export const useTransactionStore = defineStore('transactions', () => {
  // * States
  const transactions = ref<Transaction[]>([])
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const recurringBillsStore = useRecurringBillsStore()

  // * Getters
  // *    transactions
  const getTransactionById = (id: string) => transactions.value.find(t => t.id === id)

  const getTransactionsByCategory = (category: string) => transactions.value.filter(t => t.category === category)

  const getTransactionsByDate = (month: number, year: number) => {
    return transactions.value.filter(t => {
      const tDate = new Date(t.date)
      // console.log(tDate.getMonth(), tDate.getFullYear())
      return tDate.getMonth() === month && tDate.getFullYear() === year
    })

  }

  //  * Actions
  // *    fetchTransactions
  const fetchTransactions = async () => {
    loading.value = true
    error.value = null

    try {
      const res = await fetch('http://localhost:3000/transactions')
      transactions.value = await res.json()
    } catch (e) {
      error.value = e as Error
    } finally {
      loading.value = false
    }
  }

  // *
  // *    transactions
  // *    transactions

  onUpdated(() => {
    recurringBillsStore.updateRecurringBills()
  })

  watch(transactions, (newTransactions, oldTransactions) => {
    recurringBillsStore.updateRecurringBills()
  })


  return {
    transactions,
    loading,
    error,
    getTransactionById, getTransactionsByCategory, getTransactionsByDate,
    fetchTransactions

  }
})
