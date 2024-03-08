<script setup>
const props = defineProps({
  open: Boolean,
  icon: {
    type: Boolean,
    default: true,
  },
  summary: String,
  content: String
});
const emit = defineEmits(['update:open', 'toggle']);

const toggleDetails = () => {
  emit('update:open', !props.open);
  emit('toggle');
}
</script>

<template>
  <details class="details" :open="open">
    <summary class="details__summary" @click="toggleDetails">
      <slot name="summary">{{ summary }}</slot>
      <div class="details__icon" v-if="icon">
        <slot name="icon">
          <span></span>
        </slot>
      </div>
    </summary>
    <div class="details__content">
      <slot>{{ content }}</slot>
    </div>
  </details>
</template>

<style lang="scss" scoped>
.details {
  padding: 0.5rem;

  &__summary {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }

  &__icon {
    display: inline-block;
    margin-left: auto;

    >span {
      display: inline-block;
      padding: 0.5rem;
      width: 1rem;
      height: 1rem;
      position: relative;
      transform: rotate(0deg);
      transition: transform 0.3s ease-out;

      &::before,
      &::after {
        content: "";
        position: absolute;
        inset: 0;
        margin: auto;
        width: 0.8em;
        height: 2px;
        background-color: currentColor;
        transition: all 0.3s ease-out;
      }

      &::after {
        width: 0.7em;
        transform: rotate(90deg);
        opacity: 1;
      }
    }

  }

  &__content {
    padding: 0.5rem;
    max-height: 0px;
    overflow: hidden;
    transition: max-height 3s ease-out;
  }

  &[open] {
    .details__icon>span {
      transform: rotate(180deg);

      &::after {
        opacity: 0;
      }
    }

    .details__content {
      max-height: 1000px;
    }
  }
}
</style>
