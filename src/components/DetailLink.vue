<script lang="ts" setup>
import CaretRightIcon from '@/components/icons/CaretRightIcon.vue'

defineProps<{
  to: string;
}>()
</script>

<template>
  <router-link :to="to" class="link">
    <span class="text">
      <slot />
    </span>
    <CaretRightIcon v-if="to" />
  </router-link>
</template>

<style lang="scss" scoped>
.link {
  display: flex;
  align-items: center;
  color: var(--c-grey-500);
  gap: var(--spacing-3);
  transition: color .2s;

  & svg {
    fill: var(--c-grey-500);
    transition: fill .2s;
  }

  &:hover {
    color: var(--c-grey-900);

    & svg {
      fill: var(--c-grey-900);
    }
  }

}
</style>
