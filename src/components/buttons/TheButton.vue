<script lang="ts" setup>
defineProps<{
    variant: 'primary' | 'secondary' | 'destroy'
}>()
</script>

<template>
    <button class="btn">
        <slot />
    </button>
</template>

<style lang="scss" scoped>

</style>
