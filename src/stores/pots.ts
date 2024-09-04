import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Pot } from '@/types/finance.type'

export const usePotsStore = defineStore('pots', () => {
  const pots = ref<Pot[]>([])
  const loading = ref(false)
  const error = ref<Error | null>(null)

  // * Getters
  const getTotalSaved = computed(() => {
    return pots.value?.reduce((acc, curPot) =>
        acc + curPot.total
      , 0)
  })

  // * Actions
  const fetchPots = async () => {
    loading.value = true
    error.value = null

    try {
      const res = await fetch('http://localhost:3000/pots')
      if (!res.ok) {
        throw new Error('There was an error fetching pots data.')
      }
      pots.value = await res.json()
    } catch (e) {
      error.value = e as Error
    } finally {
      loading.value = false
    }
  }


  return { pots, loading, error, getTotalSaved, fetchPots }
})
