import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Budget } from '@/types/finance.type'

export const useBudgetsStore = defineStore('budgets', () => {
  const budgets = ref<Budget[]>([])
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const getMaxBudgetLimit = computed(() =>
    budgets.value.reduce((acc, budget) => acc + budget.maximum, 0)
  )
  const getBudgetSpent = computed(() =>
    // budgets.value.reduce((acc, budget) => acc + 1, 0)
    338
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
