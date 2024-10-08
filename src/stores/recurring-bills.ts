import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useTransactionStore } from '@/stores/transactions'
import type { RecurringTransaction, Transaction } from '@/types/finance.type'
import type { Sort } from '@/types/category.type'


const getDayOfMonth = (date: Date) => date.getDate()
const defaultData = () => ({ count: 0, amount: 0 })

export const useRecurringBillsStore = defineStore('recurring-bills', () => {
  const transactionsStore = useTransactionStore()

  const recurringBills = ref<Transaction[]>([])
  const totalBills = ref(0)

  const paidBills = ref<{ count: number, amount: number }>(defaultData())
  const totalUpcoming = ref<{ count: number, amount: number }>(defaultData())
  const dueSoon = ref<{ count: number, amount: number }>(defaultData())

  const updateRecurringBills = () => {
    recurringBills.value = transactionsStore.transactions.filter(t => t.recurring)
  }

  const currentPaidBills = computed(() => {
    return transactionsStore.getTransactionsByDate(7, 2024)
  })

  const getSortedRecurringBills: RecurringTransaction[] = (sortBy: Sort = 'Latest') => {
    const recurringBillsList: RecurringTransaction[] = recurringBills.value.map(t => {
      const curDate = new Date()
      const isPaid = currentPaidBills.value.some(bill => bill.name === t.name)
      const todayDay = getDayOfMonth(curDate)
      const billDay = getDayOfMonth(new Date(t.date))
      const isDue = todayDay >= billDay
      return { ...t, isPaid, isDue }
    })

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

  const updateSummary = (bills: RecurringTransaction[]) => {
    totalBills.value = 0
    paidBills.value = defaultData()
    totalUpcoming.value = defaultData()
    dueSoon.value = defaultData()
    bills.forEach(t => {
      totalBills.value += Math.abs(t.amount)
      if (t.isPaid) {
        paidBills.value.count++
        paidBills.value.amount += Math.abs(t.amount)
      } else if (!t.isPaid && !t.isDue) {
        totalUpcoming.value.count++
        totalUpcoming.value.amount += Math.abs(t.amount)
      } else if (t.isDue) {
        dueSoon.value.count++
        dueSoon.value.amount += Math.abs(t.amount)
      }
    })
  }

  watch(recurringBills, () => {
    const sortedBills = getSortedRecurringBills()
    updateSummary(sortedBills)
  })


  return {
    recurringBills, totalBills, paidBills, totalUpcoming, dueSoon,
    getSortedRecurringBills,
    updateRecurringBills, updateSummary
  }
})
