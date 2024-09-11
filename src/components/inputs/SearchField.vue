<script lang="ts" setup>
const model = defineModel('value', { type: String })
defineProps<{ placeholder }>()

</script>

<template>
    <input v-model="model" :placeholder="placeholder" class="searchbar" type="text">
</template>

<style lang="scss" scoped>
//.searchbar

</style>
