import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Balance, Budget, Pot, Transaction } from '@/types/finance.type'

export const useFinance = defineStore('finance', () => {
  // * States
  const balance = ref<Balance>()
  const transactions = ref<Transaction[]>([])
  const budgets = ref<Budget[]>([])
  const pots = ref<Pot[]>([])

  const loading = ref(false)
  const error = ref<Error | null>(null)

  // * Getters
  // *    transactions
  const getTransactionById = (id: string) => transactions.value.find(t => t.id === id)

  // *    Budgets
  const getBudgetById = (id: string) => budgets.value.find(b => b.id === id)

  // *    Pots
  const getPotById = (id: string) => pots.value.find(p => p.id === id)

  //  * Actions
  // *    balance
  // *
  // *    transactions
  // *    transactions


  return {
    balance, transactions, budgets, pots,
    getTransactionById, getBudgetById, getPotById

  }
})
