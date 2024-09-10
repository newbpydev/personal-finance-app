<script lang="ts" setup>
import type { Transaction } from '@/types/finance.type'
import { formatCurrency } from '../../utils/currency'
import { formatDate } from '../../utils/dates'

defineProps<{
    transactions: Transaction[]
}>()

</script>

<template>
    <ul class="transaction-list">
        <li v-for="transaction of transactions" :key="transaction.id" class="list-item">
            <div class="img">
                <img :alt="`avatar image of ${transaction.name}`" :src="transaction.avatar" />
            </div>
            <p class="name">{{ transaction.name }}</p>

            <div class="value-date">
                <span class="value">{{ transaction.amount > 0 ? '+' : '' }}{{ formatCurrency(transaction.amount)
                    }}</span>
                <span class="date">{{ formatDate(transaction.date) }}</span>
            </div>
        </li>
    </ul>
</template>

<style lang="scss" scoped>
@use '../../assets/styles/utils' as u;

.transaction-list {
    display: flex;
    flex-direction: column;

    & .list-item {
        display: flex;
        position: relative;
        align-items: center;
        gap: var(--spacing-4);
        padding-bottom: var(--spacing-5);
        padding-top: var(--spacing-5);
        border-bottom: .1rem solid var(--c-grey-100);

        &:first-child {
            padding-top: 0;
        }

        &:last-child {
            padding-bottom: 0;
            border-bottom: 0;
        }

        //&::after {
        //  content: "";
        //  position: absolute;
        //  bottom: 1rem;
        //  height: .1rem;
        //  width: 100%;
        //  background: var(--c-grey-100);
        //
        //  &:last-of-type {
        //    display: none;
        //  }
        //}
        & .img {
            //height: 4rem;
            @include u.responsive(height, var(--spacing-8), var(--spacing-10));
            @include u.responsive(width, var(--spacing-8), var(--spacing-10));

            & img {
                display: block;
                border-radius: 4rem;

            }
        }

        & .name {
            flex: 1 0 0;
            @include u.text-preset-4-bold();
        }

        & .value-date {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: var(--spacing-2);

            & .value {
                @include u.text-preset-4-bold();
            }

            & .date {
                @include u.text-preset-5;
                color: var(--c-grey-500);
            }
        }
    }
}

</style>
