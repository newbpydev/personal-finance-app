<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import OverviewIcon from '@/components/icons/OverviewIcon.vue'
import TransactionsIcon from '@/components/icons/TransactionsIcon.vue'
import BudgetsIcon from '@/components/icons/BudgetsIcon.vue'
import PotsIcon from '@/components/icons/PotsIcon.vue'
import RecurringBillsIcon from '@/components/icons/RecurringBillsIcon.vue'
import LogoLarge from '@/components/icons/LogoLarge.vue'
import LogoSmall from '@/components/icons/LogoSmall.vue'
import MinimizeMenuIcon from '@/components/icons/MinimizeMenuIcon.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isMinimized = ref(false)

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

const handleIsMinimized = () => {
  isMinimized.value = !isMinimized.value
}
</script>

<template>
  <header :class="{'minimized': isMinimized}">
    <div v-show="isDesktop" class="logo" @click="router.push({name: 'overview'})">
      <Transition mode="out-in" name="fade">
        <LogoSmall v-if="isMinimized" />
        <LogoLarge v-else />
      </Transition>
    </div>

    <nav>
      <ul class="navigation-list">
        <li class="navigation-item">
          <router-link :class="{'navigation-link': true, 'minimized': isMinimized}" :to="{name: 'overview'}">
            <OverviewIcon />
            <span class="text">Overview</span>
          </router-link>
        </li>
        <li class="navigation-item">
          <router-link :class="{'navigation-link': true, 'minimized': isMinimized}" :to="{name: 'transactions'}">
            <TransactionsIcon />
            <span class="text">Transactions</span>
          </router-link>
        </li>
        <li class="navigation-item">
          <router-link :class="{'navigation-link': true, 'minimized': isMinimized}" :to="{name: 'budgets'}">
            <BudgetsIcon />
            <span class="text">Budgets</span>
          </router-link>
        </li>
        <li class="navigation-item">
          <router-link :class="{'navigation-link': true, 'minimized': isMinimized}" :to="{name: 'pots'}">
            <PotsIcon />
            <span class="text">Pots</span>
          </router-link>
        </li>
        <li class="navigation-item">
          <router-link :class="{'navigation-link': true, 'minimized': isMinimized}" :to="{name: 'recurring-bills'}">
            <RecurringBillsIcon />
            <span class="text">Recurring Bills</span>
          </router-link>
        </li>
      </ul>
    </nav>

    <button v-show="isDesktop" :class="{'btn': true, 'minimized': isMinimized}" @click="handleIsMinimized">
      <MinimizeMenuIcon class="btn-icon" />
      <span class="text">Minimize Menu</span>
    </button>
  </header>
</template>

<style lang="scss" scoped>
@import '../assets/styles/utils.scss';
@import '../assets/styles/animations.scss';

.fade-enter-active,
.fade-leave-active {
  transition: opacity .2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: .9;
}

//.wrapper-
header {
  background-color: var(--color-background-dark);
  display: inline-flex;
  align-items: flex-start;
  gap: var(--spacing-6, 2.4rem);
  color: var(--c-grey-300);
  min-width: 30rem;
  transition: min-width .3s, width .3s;
  @include responsive(flex-direction, null, null, column);
  @include responsive(border-radius,
    var(--border-radius-sm) var(--border-radius-sm) 0 0,
    null,
    0 var(--border-radius-lg) var(--border-radius-lg) 0
  );
  @include responsive(width, null, null, 30rem);
  @include responsive(padding-bottom, null, null, var(--spacing-6, 2.4rem));

  @media (min-width: 90em) {
    .text {
      min-width: 17.2rem;
      opacity: 1;
      animation: fade-in .2s ease-in-out;
    }
    .btn-icon {
      animation: flip-back .2s ease-in-out;
      transform: rotateY(0);
    }

    & .navigation-link .text {
      //transition: transform .2s;

    }

    &.minimized {
      min-width: 8.8rem;
      width: 8.8rem;

      & .navigation {
        &-list {
          padding-right: var(--spacing-2);
        }

        &-link .text {
          animation: fade-out .2s ease-in-out;
          opacity: 0;
          z-index: -10;
          //transform: translateX(-30rem);
        }
      }

      & .btn {
        & .btn-icon {
          transform: rotateY(180deg);
          animation: flip-around .2s ease-in-out;
        }

        & .text {
          animation: fade-out .2 ease-in-out;
          opacity: 0;
          z-index: -10;
        }
      }
    }
  }


  & .logo {
    display: flex;
    cursor: pointer;
    padding: var(--spacing-10) var(--spacing-8);

    & svg * {
      transition: fill .2s;
      //min-width: 2.2rem;
    }

    &:hover svg * {
      fill: var(--c-theme-green);

    }
  }

  & nav {
    width: 100%;
    display: flex;
    justify-content: center;
    flex: 1 0 0;
    //align-items: center;
  }

  .navigation {
    &-list {
      width: 100%;
      display: flex;
      flex: 1 0 0;
      max-width: 80rem;
      max-height: 80rem;
      align-self: stretch;
      @include responsive(gap, null, null, var(--spacing-1, .4rem));
      //@include responsive(align-items, center, null, flex-start);
      @include responsive(justify-content, space-between, null, unset);
      @include responsive(flex-direction, row, null, column);
      @include responsive(padding,
        var(--spacing-2, .8rem) var(--spacing-4, 1.6rem) 0 var(--spacing-4, 1.6rem),
        var(--spacing-2, .8rem) var(--spacing-10, 4rem) 0 var(--spacing-10, 4rem),
        0 var(--spacing-6, 2.4rem) 0 0
      );
    }

    &-item {
      display: flex;
      //@include responsive(width, 100%, 10.4rem);
      //width: min(6.86rem);
      width: 100%;
      justify-content: center;
      //height: 100%;
    }

    &-link {
      display: flex;
      align-items: center;
      transition-timing-function: ease;
      fill: var(--c-grey-300);
      transition-property: fill, color, background-color;
      transition-duration: .3s;
      //gap: var(--spacing-1, .4rem);
      //flex: 1 0 0;
      @include text-preset-5-bold();
      //justify-content: center;
      //width: clamp(6.86rem, 10.4rem, 100%);
      @include responsive(gap, null, var(--spacing-1), var(--spacing-4));
      @include responsive(width, 6.86rem, 10.4rem, 100%);
      //padding: var(--spacing-2, .8rem) 0 var(--spacing-3, 1.2rem);
      @include responsive(padding,
        var(--spacing-2) 0 var(--spacing-3),
        null,
        var(--spacing-4) var(--spacing-8)
      );
      //@include responsive(height, null, null, 5.6rem);
      @include responsive(align-self, null, null, stretch);
      @include responsive(flex-direction, column, null, row);
      @include responsive(border-radius,
        var(--border-radius-sm) var(--border-radius-sm) 0 0,
        null,
        0 var(--border-radius-lg) var(--border-radius-lg) 0
      );
      @include responsive(border-left, null, null, var(--spacing-1, .4rem) solid var(--c-grey-900));

      @media (min-width: 90em) {
        @include text-preset-3();
      }

      & svg {
        height: 2.4rem;
        min-width: 2.4rem;
      }

      &:hover {
        fill: var(--c-grey-100);
        color: var(--c-grey-100);
      }

      &.router-link-active {
        background-color: var(--c-beige-100);
        color: var(--c-grey-900);
        fill: var(--c-theme-green);
        @include responsive(border-radius,
          var(--border-radius-sm) var(--border-radius-sm) 0 0,
          null,
          0 var(--border-radius-lg) var(--border-radius-lg) 0
        );
        @include responsive(border-bottom, var(--spacing-1, .4rem) solid var(--c-theme-green), null, none);
        @include responsive(border-left, null, null, var(--spacing-1, .4rem) solid var(--c-theme-green));
      }

      &.minimized {
        & span {
          //display: none;
          //opacity: 0%;
        }
      }

      //& img {
      //  //display: block;
      //  height: 2.4rem;
      //}

      & .text {
        display: none;
        //transition: all .5s;
        //opacity: 0;
        @media (min-width: 45em) {
          display: block;
          //opacity: 1;
        }

        @media (min-width: 90em) {
          animation: fade-in .5s;
          min-width: 17.2rem;
        }
      }

    }
  }

  & .btn {
    display: flex;
    gap: var(--spacing-4, 1.6rem);
    color: var(--c-grey-300);
    text-align: left;
    //align-items: center;
    padding: var(--spacing-4, 1.6rem) var(--spacing-8, 3.2rem);
    height: 5.6rem;
    margin-bottom: var(--spacing-8);
    @include text-preset-3();

    & svg {
      height: 2.4rem;
      width: 2.4rem;
    }

    &.minimized {
      & span {
        //display: none;
      }
    }
  }
}

</style>
