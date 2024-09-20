<script lang="ts" setup>
import { ref } from 'vue'

import EllipsisIcon from '@/assets/images/icon-ellipsis.svg'

const showAction = ref(false)

const handleShowAction = () => {
    showAction.value = !showAction.value
}
</script>

<template>
    <div class="wrapper">
        <button aria-label="open menu" class="btn" @click="handleShowAction">
            <EllipsisIcon />
        </button>
        <ul v-show="showAction" class="list">
            <li class="item">Edit Pot</li>
            <li class="item">Delete Pot</li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>

</style>
