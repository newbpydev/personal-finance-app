import { defineStore } from 'pinia'
import { computed, onUpdated, ref } from 'vue'
import { useTransactionStore } from '@/stores/transactions'
import type { RecurringTransaction, Transaction } from '@/types/finance.type'
import type { Sort } from '@/types/category.type'


const getDayOfMonth = (date: Date) => date.getDate()

export const useRecurringBillsStore = defineStore('recurring-bills', () => {
  const transactionsStore = useTransactionStore()

  const recurringBills = ref<Transaction[]>([])
  const totalBills = ref(0)

  const updateRecurringBills = () => {
    recurringBills.value = transactionsStore.transactions.filter(t => t.recurring)
  }

  const currentPaidBills = computed(() => {
    return transactionsStore.getTransactionsByDate(7, 2024)
  })

  const getSortedRecurringBills: RecurringTransaction[] = (sortBy: Sort) => {
    const recurringBillsList = recurringBills.value.map(t => {
      const curDate = new Date()
      const isPaid = currentPaidBills.value.some(bill => bill.name === t.name)

      // const bill = currentPaidBills.value.find(b => b.name === t.name)
      // const bill = currentPaidBills.value.find(b => b.name === t.name)
      const todayDay = getDayOfMonth(curDate)
      // const billDay = getDayOfMonth(new Date(bill?.date))
      const billDay = getDayOfMonth(new Date(t.date))
      // const isDue = isNaN(billDay) ? true : todayDay >= billDay
      const isDue = todayDay >= billDay


      return { ...t, isPaid, isDue }
    })
    
    // updating totalBills
    totalBills.value = Math.abs(recurringBillsList.reduce((acc, t) => acc += t.amount, 0))

    switch (sortBy) {
      case 'Oldest':
        return [...recurringBillsList].sort((a: Transaction, b: Transaction) => {
          return new Date(b.date).getDate() - new Date(a.date).getDate()
        })
      case 'A to Z':
        return [...recurringBillsList].sort((a: Transaction, b: Transaction) => a.name.localeCompare(b.name))
      case 'Highest':
        return [...recurringBillsList].sort((a, b) => a.amount - b.amount)
      case 'Lowest':
        return [...recurringBillsList].sort((a, b) => b.amount - a.amount)
      default:
        return [...recurringBillsList].sort((a: Transaction, b: Transaction) => {
          return new Date(a.date).getDate() - new Date(b.date).getDate()
        })
    }
  }

  // const getCurrent

  onUpdated(() => {
    console.log(recurringBills.value)
  })

  return {
    recurringBills, totalBills,
    getSortedRecurringBills,
    updateRecurringBills
  }
})
