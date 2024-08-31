import { createRouter, createWebHistory } from 'vue-router'
import OverviewView from '@/views/OverviewView.vue'
import AuthView from '@/views/AuthView.vue'
import TransactionsView from '@/views/TransactionsView.vue'
import BudgetsView from '@/views/BudgetsView.vue'
import PotsView from '@/views/PotsView.vue'
import RecurringBills from '@/views/RecurringBills.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { //TODO: Reroute it before production
      path: '/',
      name: 'home',
      redirect: 'overview'
    },
    {
      path: '/overview',
      name: 'overview',
      component: OverviewView
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: TransactionsView
    },
    {
      path: '/budgets',
      name: 'budgets',
      component: BudgetsView
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
