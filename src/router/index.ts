import { createRouter, createWebHistory } from 'vue-router'
import OverviewView from '@/views/OverviewView.vue'
import AuthView from '@/views/AuthView.vue'
import TransactionsView from '@/views/TransactionsView.vue'
import BudgetView from '@/views/BudgetView.vue'
import PotsView from '@/views/PotsView.vue'
import RecurringBills from '@/views/RecurringBills.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'overview',
      component: OverviewView
    },
    {
      path: '/auth',
      name: 'overview',
      component: AuthView
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: TransactionsView
    },
    {
      path: '/budget',
      name: 'budget',
      component: BudgetView
    },
    {
      path: '/pots',
      name: 'pots',
      component: PotsView
    },
    {
      path: '/recurring-bills',
      name: 'recurring-bills',
      component: RecurringBills
    }
  ]
})

export default router
