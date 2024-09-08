<script lang="ts" setup>

import { useRecurringBillsStore } from '@/stores/recurring-bills'
import { onMounted } from 'vue'

const recurringBillsStore = useRecurringBillsStore()

onMounted(() => {
})
</script>

<template>
    <div v-for="bill in recurringBillsStore.recurringBills" :key="bill.id">
        {{ bill.name }} {{ bill.amount }}
    </div>
</template>

<style lang="scss" scoped>

</style>
