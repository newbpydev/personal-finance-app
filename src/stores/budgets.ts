import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Budget } from '@/types/finance.type'
import { useTransactionStore } from '@/stores/transactions'

export const useBudgetsStore = defineStore('budgets', () => {
  const budgets = ref<Budget[]>([])
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const getMaxBudgetLimit = computed(() =>
    budgets.value.reduce((acc, budget) => acc + budget.maximum, 0)
  )
  const getBudgetSpent = computed(() => {
      const transactionsStore = useTransactionStore()
      const data = budgets.value.reduce((acc, budget) => [...acc, budget.category], [])
      let spentSum = 0
      for (const budgetString of data) {
        spentSum += transactionsStore.getTransactionsByCategory(budgetString).reduce((acc, transaction) => acc + transaction.amount, 0)
      }
      return Math.abs(spentSum)
    }
  )

  const fetchBudgets = async () => {
    loading.value = true
    error.value = null

    try {
      const res = await fetch('http://localhost:3000/budgets')
      if (!res.ok) {
        throw new Error('Failed to fetch budgets.')
      }
      budgets.value = await res.json()
    } catch (e) {
      error.value = e as Error
    } finally {
      loading.value = false
    }
  }

  return {
    budgets, loading, error,
    getMaxBudgetLimit, getBudgetSpent,
    fetchBudgets
  }
})
