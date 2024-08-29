<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import OverviewIcon from '@/components/icons/OverviewIcon.vue'

const isMenuMinimized = ref(false)
const isTest = computed(() => {
  return window.innerWidth
})

const isDesktop = ref(window.innerWidth >= 1440)

onMounted(() => {
  window.addEventListener('resize', updateScreenWidth)
})
onUnmounted(() => {
  window.removeEventListener('resize', updateScreenWidth)
})

const updateScreenWidth = () => {
  isDesktop.value = window.innerWidth >= 1440
}

</script>

<template>
  <header>
    <picture v-show="isDesktop">
      <source media="(min-width: )" srcset="">
      <img alt="finance company logo" src="../assets/images/logo-large.svg" />
    </picture>

    <nav>
      <ul class="navigation-list">
        <li class="navigation-item">
          <router-link :to="{name: 'overview'}" class="navigation-link">
            <OverviewIcon />
            <span>Overview</span>
          </router-link>
        </li>
        <li class="navigation-item">
          <router-link :to="{name: 'transactions'}" class="navigation-link">
            <img alt="icon nav transactions" src="../assets/images/icon-nav-transactions.svg" title="Transactions">
            <span>Transactions</span>
          </router-link>
        </li>
        <li class="navigation-item">
          <router-link :to="{name: 'budgets'}" class="navigation-link">
            <img alt="icon nav budgets" src="../assets/images/icon-nav-budgets.svg" title="Budgets">
            <span>Budgets</span>
          </router-link>
        </li>
        <li class="navigation-item">
          <router-link :to="{name: 'pots'}" class="navigation-link">
            <img alt="icon nav pots" src="../assets/images/icon-nav-pots.svg" title="Pots">
            <span>Pots</span>
          </router-link>
        </li>
        <li class="navigation-item">
          <router-link :to="{name: 'recurring-bills'}" class="navigation-link">
            <img alt="icon nav recurring bills" src="../assets/images/icon-nav-recurring-bills.svg"
                 title="Recurring Bills">
            <span>Recurring Bills</span>
          </router-link>
        </li>
      </ul>
    </nav>

    <button v-show="isDesktop">Minimize Menu</button>
  </header>
</template>

<style lang="scss" scoped>
@import '../assets/styles/utils.scss';

header {
  background-color: var(--color-background-dark);
  display: flex;
  gap: var(--spacing-6, 2.4rem);
  color: var(--c-grey-300);
  @include responsive(border-top-left-radius, var(--border-radius-sm), none, 0);
  @include responsive(border-top-right-radius, var(--border-radius-sm), none, 0);

  & nav {
    width: 100%;
  }

  .navigation {
    &-list {
      width: 100%;
      display: flex;
      justify-content: space-between;
      @include responsive(flex-direction, row, none, column);
      padding: var(--spacing-2, .8rem) var(--spacing-4, 1.6rem) 0 var(--spacing-4, 1.6rem);
    }

    &-item {
      display: block;
      width: 100%;
      height: 100%;
    }

    &-link {
      display: flex;
      @include text-preset-5-bold();
      //@include responsive(flex-direction, row, row);
      //flex-direction: column;
      @include responsive(flex-direction, column, none, row);
      justify-content: center;
      align-items: center;
      padding: var(--spacing-2, .8rem) 0 var(--spacing-3, 1.2rem);

      &.router-link-active {
        background-color: var(--c-beige-100);
        color: var(--c-grey-900);
        @include responsive(border-top-left-radius, var(--border-radius-sm), none, 0);
        @include responsive(border-top-right-radius, var(--border-radius-sm), none, 0);
        @include responsive(border-bottom, var(--spacing-1, .4rem) solid var(--c-theme-green));

        fill: var(--c-theme-green);
      }

      & img {
        display: block;
        height: 2.4rem;
      }

      & span {
        display: none;
        @media (min-width: 45em) {
          display: block;
        }
      }

    }

  }
}

</style>
