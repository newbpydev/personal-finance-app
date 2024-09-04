import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Balance } from '@/types/finance.type'

export const useBalanceStore = defineStore('balance', () => {
  // * States
  const balance = ref<Balance>()
  const loading = ref(false)
  const error = ref<Error | null>(null)

  // * Getters
  // *    transactions

  //  * Actions
  // *    fetchBalance
  const fetchBalance = async () => {
    loading.value = true
    error.value = null
    try {
      const res = await fetch('http://localhost:3000/balance')
      if (!res.ok) {
        throw new Error('Error fetching balance')
      }
      balance.value = await res.json()
    } catch (e) {
      console.log({ e })
      error.value = e as Error
    } finally {
      loading.value = false
    }
  }

  return {
    balance,
    loading,
    error,
    fetchBalance

  }
})
